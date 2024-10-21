// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: {
          search: "Tìm kiếm",
          home: "Trang chủ",
          new: "Tin tức",
          topTournaments: "Các giải đấu đỉnh cao",
          theme: "Chủ đề",
          language: "Ngôn ngữ",
          team: "Đội bóng của tôi",
          world: "Thế giới",
          table: "Bảng xếp hạng",
          matches: "Lịch thi đấu",
          upcoming: "Sắp diễn ra",
          completed: "Đã hoàn thành"
        },
      },
      en: {
        translation: {
          search: "Search",
          home: "Home",
          new: "News",
          topTournaments: "Top tournaments",
          theme: "Theme",
          language: "Language",
          team: "My team",
          world: "World",
          table: "Table",
          matches: "Matches",
          upcoming: "Upcoming",
          completed: "Completed"
        },
      }
    },
    lng: "vi", // Default
    fallbackLng: "vi", // Backup
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
