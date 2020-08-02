export interface Http<T, I> {
  create(o: T, callback: any): void;

  read(id: I, callback: any): void;

  readAll(callback: any): void;

  update(id: I, o: T, callback: any): void;

  delete(id: I, callback: any): void;
}
