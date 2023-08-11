<script setup lang="ts">
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonPage,
  IonContent,
  IonMenuButton,
  IonButton,
  IonLabel,
} from "@ionic/vue";
</script>

<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>Default</ion-button>
          <ion-button>Default</ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/card-media.png"
        />
        <ion-card-content>
          Here's a small text description for the card content. Nothing more,
          nothing less.
        </ion-card-content>
      </ion-card>
      <ion-grid>
        <ion-row>
          <ion-col><IonButton expand="full">A</IonButton></ion-col>
          <ion-col><IonButton expand="full">B</IonButton></ion-col>
          <ion-col><IonButton expand="full">C</IonButton></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
