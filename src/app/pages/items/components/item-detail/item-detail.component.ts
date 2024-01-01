import { ImagesModalComponent } from './../images-modal/images-modal.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { ItemService } from '../../service/item.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
  MatDialogRef: any;
  constructor(
    private $itemService: ItemService,
    private $alert: AlertService,
    private $router: Router,
    private $dialog: MatDialog,
    private $dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}
  baseUrl: any = environment.baseUrl;
  ngOnInit(): void {
    this.getParamsIds();
    this.getItemList();
  }

  itemId = '';
  getParamsIds() {
    // //console.log("getToornamentDetails");
    this.activatedRoute.params.subscribe((catchRoute: any) => {
      this.itemId = catchRoute?.itemId;
      //console.log('this.moduleId', this.moduleId, 'this.programId', this.programId)
    });
  }

  isLoading = false;
  itemDetails: any = [];
  getItemList(): void {
    this.isLoading = true;
    this.$itemService.itemDetails(this.itemId).subscribe(
      (res: any) => {
        this.isLoading = false;
        console.log('getItemList', res);
        this.itemDetails = res.data;
        console.log('getItemList', this.itemDetails);
        // this.totalUser = res.data.count;
      },
      (err) => {
        this.isLoading = true;
        this.$alert.danger(err.message);
      }
    );
  }

  editItem() {
    this.$router.navigateByUrl(`/item/edit/${this.itemId}`);
  }

  OpenImageModal(img: any) {
    this.$dialog.open(ImagesModalComponent, {
      width: '500px',
      height: '500px',
      data: img,
    });
  }
}
