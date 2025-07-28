# 🗞️ NewsX - Modern News Application

A sleek, responsive news application built with React and Vite that delivers the latest news from trusted sources with a beautiful, modern interface.


## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Mobile-first approach with hamburger navigation
- **Smooth Animations** - Elegant transitions and hover effects throughout
- **Glass Morphism** - Modern card designs with shadows and blur effects
- **Loading Skeletons** - Beautiful loading states for better perceived performance

### 🔍 **Enhanced Functionality**
- **Real-time Search** - Instantly search across article titles and descriptions
- **Smart Sorting** - Sort articles by newest, oldest, or alphabetically
- **Category Navigation** - Browse news by General, Technology, Business, Health, Sports, and Entertainment
- **Lazy Loading** - Images load efficiently as needed
- **Error Recovery** - Automatic retry logic with multiple fallback sources

### 📱 **Responsive Experience**
- **Mobile Optimized** - Touch-friendly interface with proper gesture support
- **Cross-browser Compatible** - Works seamlessly across all modern browsers
- **Accessibility First** - ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized** - React.memo, useCallback, and efficient re-rendering

## 🚀 Live Demo

[**🔗 View Live**](https://news-magzine-fey7.vercel.app/)

</details>

## 🛠️ Technologies Used

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Modern CSS with CSS Variables
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)
- **State Management:** React Hooks (useState, useEffect, useCallback)
- **Performance:** React.memo, useMemo for optimization
- **Error Handling:** Error Boundaries for robust error recovery

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Princearya34/newsx-app.git
   cd newsx-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Comprehensive styling system
├── index.css               # Base styles and utilities
├── main.jsx                # Entry point with error boundary
└── components/
    ├── NavBar.jsx          # Navigation with mobile support
    ├── NewsBoard.jsx       # News display with search/sort
    ├── NewsItem.jsx        # Individual news card component
    ├── LoadingSpinner.jsx  # Loading states and skeletons
    └── SearchBar.jsx       # Advanced search functionality
```

## 🔧 Key Components

### NewsBoard
- Fetches news from RSS feeds
- Implements search and sorting functionality
- Handles loading states and error recovery
- Supports multiple news categories

### NewsItem
- Optimized with React.memo for performance
- Lazy loading images with fallback support
- Responsive card design with hover effects
- Accessibility features and keyboard navigation

### SearchBar
- Real-time search with debouncing
- Expandable interface with smooth animations
- Clear search functionality
- Mobile-optimized touch interactions

## 🎯 Performance Features

- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Lazy loading with fallback images
- **Memory Management** - Proper cleanup and memoization
- **Bundle Optimization** - Tree shaking and minification
- **Caching Strategy** - Efficient data fetching and caching

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 News Sources

Currently fetching news from:
- BBC News (General, Technology, Business, Health, Sports, Entertainment)
- RSS feeds parsed in real-time
- Multiple proxy services for reliability

## 🔮 Future Enhancements

- [ ] **Progressive Web App (PWA)** - Offline support and install prompts
- [ ] **User Preferences** - Personalized news categories
- [ ] **Bookmark System** - Save favorite articles
- [ ] **Social Sharing** - Share articles on social platforms
- [ ] **Multiple News Sources** - Integrate additional news APIs
- [ ] **Push Notifications** - Breaking news alerts
- [ ] **Reading Time Estimation** - Article reading time calculation
- [ ] **Full-text Search** - Advanced search with filters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern news platforms
- RSS feeds provided by BBC News
- Icons by Lucide React
- Font by Google Fonts (Inter)

⭐ **If you found this project helpful, please give it a star!** ⭐
