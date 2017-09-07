import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class HeaderSizingService {

  heightChanged = new Subject<number>();
  currentHeight: number;

  setHeightChanged(newHeight: number) {
    if(this.currentHeight != newHeight) {
      this.currentHeight = newHeight;
      this.heightChanged.next(this.currentHeight);
    }
  }

}
