import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { ShoppingCartComponent } from './myprofile/shopping-cart/shopping-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileInformationComponent } from './myprofile/profile-information/profile-information.component';
import { ManageAddressComponent } from './myprofile/manage-address/manage-address.component';
import { ReviewsRatingComponent } from './myprofile/reviews-rating/reviews-rating.component';
import { SavedCardsComponent } from './myprofile/saved-cards/saved-cards.component';
import { WishlistComponent } from './myprofile/wishlist/wishlist.component';
import { MyRewardsComponent } from './myprofile/my-rewards/my-rewards.component';
import { NotificationsComponent } from './myprofile/notifications/notifications.component';
import {AuthService } from './services/auth-service';
import { ProductResolverService } from './products/product-resolver.service';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reset_password',
    component : ForgotPasswordComponent
  },
  {
    path: 'reset_password/:token',
    component : ChangepasswordComponent
  },
  {
    path: 'product/:category',
    component: ProductsComponent
  },
  {
    path:'product/:category/:name/:id',
    component: SingleProductComponent,
    resolve: [ProductResolverService]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },

  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'profile',
        component: ProfileInformationComponent
      },
      {
        path: 'address',
        component: ManageAddressComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'reviews',
        component: ReviewsRatingComponent
      },
      {
        path: 'carddetails',
        component: SavedCardsComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'rewards',
        component: MyRewardsComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]

  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
