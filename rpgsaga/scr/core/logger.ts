export class Logger {
  private readonly lines: string[] = [];

  public log(message: string): void {
    this.lines.push(message);
    console.log(message);
  }

  public getLogs(): string[] {
    return [...this.lines];
  }
}
