import { NgModule } from '@angular/core';
import { MatBottomSheetModule ,MatListModule,MatInputModule,MatButtonModule} from '@angular/material';

  const materialComponents = [ 

      MatBottomSheetModule,
      MatListModule,
      MatInputModule,
      MatButtonModule


   ]

@NgModule({
  imports:[materialComponents],
  exports:[materialComponents]
})
export class MaterialModule { }
