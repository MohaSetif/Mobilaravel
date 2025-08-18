import HomeIcon from '@/assets/icons/home.svg';
import GalleryIcon from '@/assets/icons/gallery.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

export const links = [
    {
        name: "Home",
        link: "",
        icon: "home",
    },
    {
        name: "Gallery",
        link: "gallery",
        icon: "gallery",
    },
    {
        name: "Profile",
        link: "profile",
        icon: "profile",
    }
]

export const iconMap: Record<string, any> = {
    home: HomeIcon,
    gallery: GalleryIcon,
    profile: ProfileIcon,
  };

// export const authLinks = [
//     {
//         name: "Register",
//         link: "register",
//         icon: "Register",
//     },
//     {
//         name: "Login",
//         link: "login",
//         icon: "Login",
//     }
// ]