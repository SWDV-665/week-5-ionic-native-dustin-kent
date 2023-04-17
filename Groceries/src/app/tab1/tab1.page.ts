import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

 
  constructor(public NavCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogServce: InputDialogServiceService, public socialSharing: SocialSharing) {
  }

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item: any, index: number) {
    console.log("Removing Item -", item, index);
    const toast = await this.toastCtrl.create({
      message: "Removing Item - " + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item: any, index: number) {
    console.log("Sharing Item -", item, index);
    const toast = await this.toastCtrl.create({
      message: "Sharing Item - " + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grcery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully!")
      }).catch((error: any) => {
        console.error("Error While Sharring ", error);

      });
  }

  async editItem(item: any, index: number) {
    console.log("Editing Item -", item, index);
    const toast = await this.toastCtrl.create({
      message: "Editing Item - " + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogServce.showPrompt(item,index);
  }

  addItem() {
    console.log ("Adding Item")
    this.inputDialogServce.showPrompt();
  }

  
}

