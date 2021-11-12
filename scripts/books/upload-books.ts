// Externals
import { config } from "dotenv-safe";
import { createClient } from "contentful-management";
import {
  Entry,
  Environment,
} from "contentful-management/dist/typings/export-types";
import isEqual from "lodash.isequal";
import { readdir, readFile } from "fs/promises";
import { join, basename } from "path";
import colors from "colors";

config();

type Field<T = unknown> = {
  "en-US": T;
};

type BookData = Record<string, unknown> & {
  id: string;
  author: Record<string, unknown>;
};

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN ?? "",
});

class Output {
  private output: any[] = [];

  log(value: any) {
    this.output.push(value);
  }

  bold(text: string) {
    this.output.push(colors.bold(text) + colors.reset(""));
  }

  success(text: string) {
    this.output.push(colors.green(text) + colors.reset(""));
  }

  flush() {
    this.output.forEach((value) => console.log(value));
  }
}

class UploadBooks {
  private static readonly BOOKS_PATH = join(__dirname, "data", "books");
  private readonly currentBooks: Entry[] = [];
  private readonly newBooks: BookData[] = [];
  private env: Environment = {} as Environment;

  private async setEnv() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID ?? "");
    this.env = await space.getEnvironment("master");
  }

  private async getNewBooks() {
    const files = await readdir(UploadBooks.BOOKS_PATH);

    for await (const file of files) {
      const filePath = join(UploadBooks.BOOKS_PATH, file);
      const data = await readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);
      const id = basename(file, ".json");
      this.newBooks.push({ ...parsed, id });
    }
  }

  private async getCurrentBooks() {
    const recurse = async (skip = 0) => {
      const entries = await this.env.getEntries({
        content_type: "book",
        include: 0,
        skip,
      });

      this.currentBooks.push(...entries.items);

      if (entries.total > entries.limit + entries.skip) {
        await recurse(entries.limit + entries.skip);
      }
    };

    await recurse();
  }

  private createField<T = unknown>(value: T): Field<T> {
    return { "en-US": value };
  }

  private decodeField<T = unknown>(field: Field<T>): unknown {
    const decoded = field?.["en-US"];
    return Array.isArray(decoded) && decoded.length === 0 ? undefined : decoded;
  }

  private parseBook(book: BookData) {
    const parsed: Record<string, Field> = {
      title: this.createField(book["book_title"]),
      link: this.createField(book["book_url"]),
      image: this.createField(book["book_image"]),
      shelves: this.createField(book.shelves),
      genres: this.createField(book.genres),
      author: this.createField(book.author["author_name"]),
      authorLink: this.createField(book.author["author_url"]),
      datesRead: this.createField(book["dates_read"]),
      avgRating: this.createField(book["average_rating"]),
      numRatings: this.createField(book["num_ratings"]),
      numReviews: this.createField(book["num_reviews"]),
    };

    if (typeof book.rating === "number") {
      parsed.rating = this.createField(book.rating);
    }
    if (typeof book["book_series"] === "string") {
      parsed.series = this.createField(book["book_series"]);
    }
    if (typeof book["book_series_uri"] === "string") {
      parsed.seriesLink = this.createField(book["book_series_uri"]);
    }
    if (typeof book["book_series"] === "string") {
      parsed.series = this.createField(book["book_series"]);
    }
    if (typeof book["year_first_published"] === "string") {
      parsed.yearPublished = this.createField(book["year_first_published"]);
    }
    if (typeof book["num_pages"] === "number") {
      parsed.pages = this.createField(book["num_pages"]);
    }
    if (typeof book.author["author_image"] === "string") {
      parsed.authorImage = this.createField(book.author["author_image"]);
    }

    return parsed;
  }

  private async uploadBooks() {
    console.log("Uploading Books...");

    for (const book of this.newBooks) {
      const output = new Output();
      output.bold(book.id);

      const correspondingIndex = this.currentBooks.findIndex(
        (b) => b.sys.id === book.id
      );
      let corresponding = this.currentBooks[correspondingIndex];
      const parsedBook = this.parseBook(book);

      if (corresponding) {
        const updatedFields: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(parsedBook)) {
          const newValue = this.decodeField(value);
          const oldValue = this.decodeField(corresponding.fields[key] as Field);

          if (!isEqual(oldValue, newValue)) {
            corresponding.fields[key] = value;
            updatedFields[key] = newValue;
          }
        }

        const isUpdated = !!Object.keys(updatedFields).length;
        if (isUpdated) {
          output.log(updatedFields);
          corresponding = await corresponding.update();
          corresponding = await corresponding.publish();
          output.success("Updated!");
        } else {
          output.success("No Changes Needed!");
        }
        this.currentBooks.splice(correspondingIndex, 1);
      } else {
        output.log(parsedBook);
        corresponding = await this.env.createEntryWithId("book", book.id, {
          fields: parsedBook,
        });
        corresponding.publish();
        output.success("Created!");
      }

      console.log();
      output.flush();
    }
  }

  private async deleteRemovedBooks() {
    console.log();
    console.log("Deleting Removed Books...");

    for (const entry of this.currentBooks) {
      const output = new Output();
      output.bold(entry.sys.id);

      if (entry.isPublished()) {
        await entry.unpublish();
      }
      await entry.delete();
      output.success("Deleted!");

      console.log();
      output.flush();
    }
  }

  async entry() {
    await Promise.all([
      this.getNewBooks(),
      this.setEnv().then(() => this.getCurrentBooks()),
    ]);

    await this.uploadBooks();
    await this.deleteRemovedBooks();
  }
}

new UploadBooks().entry();
