using System;

using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;

namespace PlasmaRazor.Droid
{
	[Activity (Label = "PlasmaRazor.Droid", Icon = "@drawable/icon", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation,
		ScreenOrientation = ScreenOrientation.Portrait, Theme = "@style/MyTheme")]
	public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
	{
		protected override void OnCreate (Bundle bundle)
		{
			base.OnCreate (bundle);

			/* Hide bars. */
//			View decorView = Window.DecorView;
//			var uiOptions = (int)decorView.SystemUiVisibility;
//			var newUiOptions = (int)uiOptions;
//
//			newUiOptions |= (int)SystemUiFlags.LowProfile;
//			newUiOptions |= (int)SystemUiFlags.Fullscreen;
//			newUiOptions |= (int)SystemUiFlags.HideNavigation;
//			newUiOptions |= (int)SystemUiFlags.Immersive;
//
//			decorView.SystemUiVisibility = (StatusBarVisibility)newUiOptions;
//
//			Window.AddFlags(WindowManagerFlags.Fullscreen);
//			Window.ClearFlags(WindowManagerFlags.ForceNotFullscreen);
			/* Hide bars - end. */

			global::Xamarin.Forms.Forms.Init (this, bundle);

			LoadApplication (new App ());
		}
	}
}
