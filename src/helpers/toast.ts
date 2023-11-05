import { toastController } from "@ionic/vue";

export async function showToast(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    position: "middle",
    cssClass: 'app-toast'
  });

  toast.present();
}
