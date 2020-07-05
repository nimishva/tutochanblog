import { NgModule } from '@angular/core';
import { MatBottomSheetModule ,
         MatListModule,
         MatInputModule,
         MatButtonModule,
         MatMenuModule,
        } from '@angular/material';

  const materialComponents = [ 

      MatBottomSheetModule,
      MatListModule,
      MatInputModule,
      MatButtonModule,
      MatMenuModule


   ]

@NgModule({
  imports:[materialComponents],
  exports:[materialComponents]
})
export class MaterialModule { }
