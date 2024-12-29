import dewiayu from "@/assets/images/dewiayu-carwash.png";
import movieapp from "@/assets/images/movieapp.png";
import myAnime from "@/assets/images/my-anime.png";
import restAPI from "@/assets/API.svg";
import finance from '@/assets/images/finance-dashboard.png'
import { obfuscateId } from "@/features/commons/utils/functions/hashing";

export type Project = {
  id: number;
  obfuscatedId: string; // New property to obfuscate the ID
  title: string;
  description: { en: string; id: string };
  url: { [x: string]: string };
  tags: string[];
  image: string;
  features: string[];
};

export const projects: Project[] = [
  {
    id: 231 as const,
    obfuscatedId: obfuscateId(231),
    title: "My Anime",
    description: {
      en: "An application built with Next.js and TypeScript that displays a list of anime. Users can save their favorite anime to a collection they create. The collection is stored in the browser, so it will persist even after reloading the page. The app uses Apollo Client to fetch anime data.",
      id: "aplikasi yang menggunakan next.js dengan typescript untuk menampilkan list anime. User dapat menyimpan anime yang disuka ke dalam koleksi yang dibuat. koleksi akan tersimpat dalam browser dan tidak akan hilang ketika di reload. aplikasi ini menggunakan apollo client untuk mendapatkan anime.",
    },
    features: [""],
    url: {
      demo: "https://goto-se-test.vercel.app",
      code: "https://github.com/apra-saputra/goto-se-test",
    },
    tags: [
      "Frond End",
      "Next.js",
      "Apollo/client",
      "Framer-motion",
      "@emotion/react",
    ],
    image: myAnime,
  },
  {
    id: 1 as const,
    obfuscatedId: obfuscateId(1),
    title: "Dewi Ayu Carwash",
    description: {
      en: "A web application designed to help users manage vehicles that are registered in the system. Vehicles that enter will be recorded and categorized by the user, allowing for easy tracking. This setup enables efficient calculations for payroll, as well as income or expense tracking at the end of each period.",
      id: "Aplikasi web untuk memudahkan pengguna dalam me-'manage' kendaraan yang masuk dan diinputkan kedalam sistem. Kendaraan yang masuk nanti akan terdata dan dimasukan ke kategori masing masing oleh user sehinggan pada akhir perhitungan baik penggajian ataupun perhitungan pemasukan atau pengeluaran.",
    },
    features: [""],
    url: {},
    tags: [
      "Frond End",
      "Back End",
      "Full Stack",
      "React",
      "React-Query",
      "Express",
      "NodeJs",
      "Redis",
    ],
    image: dewiayu,
  },
  {
    id: 2 as const,
    obfuscatedId: obfuscateId(2),
    title: "Approval Rest API",
    description: {
      en: "An API used to handle approvals for order creation, with different user layers based on their roles or positions.",
      id: "Sebuah API yang digunakan untuk melakukan approval ketika pembuatan order dengan layer user yang berbeda beda posisinya.",
    },
    url: { code: "https://github.com/apra-saputra/restapi-express-api" },
    tags: ["Back End", "Express", "Express-Fileupload", "Jest", "PrismaClient"],
    features: [""],
    image: restAPI,
  },
  {
    id: 3 as const,
    obfuscatedId: obfuscateId(3),
    title: "Felisa",
    description: {
      en: "A CMS-based website application that manages the order process with multi-level user approvals, integrated with Kominfo's API. The application will receive an SPP (Surat Permintaan Pembayaran) response, which will then be validated on the server.",
      id: "Website app berupa CMS yang menghandle proses order dengan persetujuan pengguna bertingkat untuk dihubungkan dengan api milik kominfo dan akan mendapat balikan berupa spp yang akan divalidasi di server.",
    },
    features: [""],
    url: {},
    tags: ["Front End", "Back End", "React", "Redux", "Laravel Lumen"],
    image: restAPI,
  },
  {
    id: 4 as const,
    obfuscatedId: obfuscateId(4),
    title: "Movie App",
    description: {
      en: "The Movie App is a mobile application that displays movies along with their cast across various interconnected menus. In the details section, the app provides information about the movie along with the actors involved. When a user clicks on an actor, detailed information about them is shown, including the movies they have appeared in.",
      id: "The movie app adalah aplikasi mobile yang menampilkan film-film beserta para pemerannya dalam berbagai menu yang saling terhubung. Di bagian detail, aplikasi ini menampilkan informasi tentang film beserta para pemeran yang berperan di dalamnya. Ketika mengklik pada seorang pemeran, akan ditampilkan informasi detail mengenai mereka dan film-film di mana aktor atau aktris tersebut tampil.",
    },
    features: [""],
    url: { code: "https://github.com/apra-saputra/movie_app" },
    tags: ["Front End", "Mobile Dev", "React Native", "Expo", "Graphql"],
    image: movieapp,
  },
  {
    id: 5 as const,
    obfuscatedId: obfuscateId(5),
    title: "Finance CMS Admin",
    description: {
      en: "A Finance Admin dashboard that allows users to record expenses, view weekly or monthly statistics, and includes notes/reminders for making payments.",
      id: "Dashboard Admin Keuangan yang memungkinkan pengguna mencatat pengeluaran, menampilkan statistik mingguan atau bulanan, dan terdapat catatan/pengingat untuk melakukan pembayaran.",
    },
    features: [
      "record user expenditures",
      "display weekly/monthly statistics",
      "include notes/reminders for payment due",
    ],
    url: { demo: "/finance" },
    tags: ["Front End", "Firebase"],
    image: finance,
  },
];
