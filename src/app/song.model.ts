export class Song {
  public name: string;
  public description: string;
  public audioPath: string;
  public length: string;

  constructor(name: string, description: string, audioPath: string, length: string) {
    this.name = name;
    this.description = description;
    this.audioPath = audioPath;
    this.length = length;
  }
}
