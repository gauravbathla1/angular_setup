import { Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FIELD_TYPE } from 'src/app/constants/input.constant';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { environment } from 'src/environments/environment';
import { ItemService } from '../../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../individualuser/service/user.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent {
  @ViewChild('ViewDialog') ViewDialog!: TemplateRef<any>;
  addItemForm: FormGroup = this.fb.group({
    itemName: ['', [Validators.required, Validators?.maxLength(50)]],
    itemOwner: ['', [Validators.required]],
    itemId: ['', [Validators.required, Validators?.maxLength(50)]],
    baseLocation: ['', [Validators.required, Validators?.maxLength(50)]],
    brand: ['', [Validators.required, Validators?.maxLength(50)]],
    type: ['', [Validators.required, Validators?.maxLength(50)]],
    custom1: ['', [Validators.required, Validators?.maxLength(50)]],
    custom2: ['', [Validators.required, Validators?.maxLength(50)]],
    borrowerId: ['', [Validators.required, Validators?.maxLength(50)]],
  })
  fieldType: any = FIELD_TYPE;
  @ViewChild('UploadFileInput')
  uploadFileInput!: ElementRef;
  myFilename = 'Select File';
  UploadImage: any;
  isImageSelected: Boolean = false;
  ImageUrl: any;
  isImageUploading = false;
  baseUrl = environment.baseUrl;
  editUrl: any;
  selectedFile: any;
  disable = false
  update = false;
  constructor(
    private $dialog: MatDialog,
    private $alert: AlertService,
    private $additem: ItemService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private $userService: UserService,
    private $router: Router,
  ) { }

  ngOnInit(): void {
    this.getParamsIds();
    if (this.itemId !== '') {
      this.getItemList();
    }
    this.getVerifiedUsers();
  }

  isLoading = false
  itemDetails: any = []
  getItemList(): void {
    this.isLoading = true
    this.$additem.itemDetails(this.itemId).subscribe((res: any) => {
      this.isLoading = false
      this.itemDetails = res.data;
      console.log("getItemList", this.itemDetails);
      this.update = true
      this.addItemForm.patchValue({
        itemName: this.itemDetails?.itemName,
        itemOwner: this.itemDetails?.itemOwner,
        itemId: this.itemDetails?.itemId,
        baseLocation: this.itemDetails?.baseLocation,
        brand: this.itemDetails?.brand,
        type: this.itemDetails?.type,
        custom1: this.itemDetails?.custom1,
        custom2: this.itemDetails?.custom2,
        borrowerId: this.itemDetails?.borrowerId?._id
      })
      // this.addItemForm.get('borrowerId').disable();

      // formData.append('itemName', this.addItemForm.value.itemName);
      // formData.append('itemOwner', this.addItemForm.value.itemOwner);
      // formData.append('itemId', this.addItemForm.value.itemId);
      // formData.append('baseLocation', this.addItemForm.value.baseLocation);
      // //formData.append('currentLocation', this.addItemForm.value.currentLocation);
      // formData.append('brand', this.addItemForm.value.brand);
      // formData.append('type', this.addItemForm.value.type);
      // formData.append('custom1', this.addItemForm.value.custom1);
      // formData.append('custom2', this.addItemForm.value.custom2);
      // formData.append('borrowerId ', this.addItemForm.value.borrower);
      // formData.append('pdf', this.myPdfFiles);
      // formData.append('images', this.myFiles);

      // this.totalUser = res.data.count;
    }, (err) => {
      this.isLoading = true;
      this.$alert.danger(err.message)
    })
  }

  verifiedUsers: any = []
  getVerifiedUsers() {
    this.$userService.verfiedUsers().subscribe((res: any) => {
      this.isLoading = false
      this.verifiedUsers = res.data;
      console.log("getItemList", this.verifiedUsers);
    }, (err) => {
      this.isLoading = true;
      this.$alert.danger(err.message)
    })
  }


  itemId = ''
  getParamsIds() {
    // //console.log("getToornamentDetails");
    this.activatedRoute.params.subscribe((catchRoute: any) => {
      this.itemId = catchRoute?.itemId || ''
      //console.log('this.moduleId', this.moduleId, 'this.programId', this.programId)
    });
  }

  closeDialog(): void { }

  uploadFile() {
    document.getElementById('fileUpload')?.click();
  }

  myFiles: any = [];
  images: any = [];
  getFileDetails(e: any) {
    console.log(this.images, 'this.images');
    console.log('getFileDetails1', e.target.files);
    let filesAmount = e.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      if (this.images.length < 5) {
        this.isImageSelected = true;
        this.myFiles.push(e.target.files[i]);
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.images = event.target.result;
          this.addItemForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(e.target.files[i]);
      } else {
        this.$alert.danger('Maximum 5 images are allowed.');
        return
      }
    }
  }

  pdfFile: any = [];
  myPdfFiles: any = [];
  isPdfUploaded = false
  getPdf(pdfEvent: any) {
    // ---------- check height & width -----------
    let imgRes = new Image();
    imgRes.src = URL.createObjectURL(pdfEvent.target.files[0]);
    let extention = pdfEvent.target.files[0].name.split('.').pop();
    if (extention == 'pdf') {
      let filesAmount = pdfEvent.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.myPdfFiles.push(pdfEvent.target.files[0]);
        const file = (pdfEvent.target.files[0] as File);
        let reader = new FileReader();
        this.isPdfUploaded = true
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.pdfFile = reader.result;
        };
      }
    } else if (
      extention != 'pdf'
    ) {

    }

  }

  onSubmit() { }

  invalid: any = false;
  addItem() {
    this.invalid = true
    if (this.addItemForm.invalid) {
      return
    }
    if (!this.isImageSelected && this.itemId == '') {
      this.$alert.danger('Please upload images');
      return
    }
    if (!this.isImageSelected && this.itemId == '') {
      this.$alert.danger('Please upload images');
      return
    }
    if (!this.isPdfUploaded && this.itemId == '') {
      this.$alert.danger('Please upload pdf');
      return
    }
    const formData: FormData = new FormData();
    formData.append('itemName', this.addItemForm.value.itemName);
    formData.append('itemOwner', this.addItemForm.value.itemOwner);
    formData.append('itemId', this.addItemForm.value.itemId);
    formData.append('baseLocation', this.addItemForm.value.baseLocation);
    //formData.append('currentLocation', this.addItemForm.value.currentLocation);
    formData.append('brand', this.addItemForm.value.brand);
    formData.append('type', this.addItemForm.value.type);
    formData.append('custom1', this.addItemForm.value.custom1);
    formData.append('custom2', this.addItemForm.value.custom2);
    formData.append('borrowerId', this.addItemForm.value.borrowerId);
    // formData.append('pdf', this.myPdfFiles);
    // formData.append('images', this.myFiles);

    formData.append('ownerName', this.addItemForm.value.custom1);
    formData.append('consignmentName', 'Static');
    formData.append('loanerName', 'Ester');
    // formData.append('borrowerId', '639abbc9f731ec47dc21dd33');
    //   this.myFiles.forEach((e: any) => {
    //   formData.append('image', e);
    // });
    for (let i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i], "update-img");
      formData.append('images', this.myFiles[i])
    }
    for (let i = 0; i < this.myPdfFiles.length; i++) {
      console.log(this.myPdfFiles[i], "update-img");
      formData.append('pdf', this.myPdfFiles[i])
    }
    if (this.itemId == '') {
    this.disable = true

      this.$additem.addItem(formData).subscribe(
        (res: any) => {
          if (res?.status == 201) {
            this.$router.navigateByUrl('item/list')
            this.$alert.success(res.message);
          }
        },
        (err) => {
          this.$alert.danger(err.message);
        }
      );
    } else {
      this.$additem.editItem(this.itemId, formData).subscribe(
        (res: any) => {
          if (res) {
            this.$router.navigateByUrl(`/item/details/${this.itemId}`)
            this.$alert.success(res.message);
          }
        },
        (err) => {
          this.$alert.danger(err.message);
        }
      );
    }
  }
  updateItem() { }


}

