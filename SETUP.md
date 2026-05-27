# 📝 HOW TO ADD YOUR PROJECTS

Follow these simple steps to customize your portfolio with your own projects!

## Step 1: Open `script.js`

Open the `script.js` file in your text editor.

## Step 2: Find the Projects Array

Look for this section at the top of the file:

```javascript
const projects = [
    {
        id: 1,
        title: "Modern E-Commerce",
        // ... properties ...
    },
    // ... more projects ...
];
```

## Step 3: Replace with Your Projects

Remove the example projects and add your own. Here's the template:

```javascript
{
    id: [NUMBER],              // Unique number (1, 2, 3, etc.)
    title: "[PROJECT NAME]",   // Name of your project
    description: "[DESCRIPTION]", // 2-3 sentence description
    image: "[IMAGE URL]",      // Link to preview image or screenshot
    url: "[WEBSITE URL]",      // Full URL to your website
    tag: "[CATEGORY]"          // Type: Portfolio, Blog, E-Commerce, etc.
}
```

## Step 4: Save and Open in Browser

Save the file and open `index.html` in your web browser to see your updated portfolio!

---

## 📸 Image URLs

You have 3 options for project images:

### Option 1: Use Direct Image Links
```javascript
image: "https://example.com/my-project-preview.jpg"
```

### Option 2: Use Unsplash (Free)
```javascript
image: "https://images.unsplash.com/photo-XXXXX?w=500&h=300&fit=crop"
```

### Option 3: Use Local Images
Place your images in the same folder as `index.html`, then:
```javascript
image: "my-project-image.jpg"
```

---

## 💻 Complete Example

Here's a complete example with 3 real projects:

```javascript
const projects = [
    {
        id: 1,
        title: "Coffee Shop Website",
        description: "Beautiful website for a local coffee shop with menu, location, and online ordering. Features smooth animations and responsive design.",
        image: "coffee-shop.jpg",
        url: "https://www.mycoffeeshop.com",
        tag: "Business"
    },
    {
        id: 2,
        title: "Fitness Tracker App",
        description: "Web application for tracking workouts and nutrition. Includes charts, progress tracking, and social features for motivation.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        url: "https://fitnesstracker-app.com",
        tag: "Web App"
    },
    {
        id: 3,
        title: "Photography Portfolio",
        description: "Professional portfolio showcasing photography work with lightbox galleries, client testimonials, and booking system.",
        image: "portfolio-preview.png",
        url: "https://photographer-portfolio.net",
        tag: "Portfolio"
    }
];
```

---

## 🎨 Available Tags

Here are common tags (you can use any):
- Portfolio
- E-Commerce
- Blog
- Dashboard
- Landing
- Business
- Web App
- Social
- Educational
- Entertainment

---

## ✅ Checklist Before Going Live

- [ ] Added all your project information
- [ ] Verified all URLs work correctly
- [ ] Added preview images for each project
- [ ] Tested clicking on each project card
- [ ] Tested the "Visit Website" buttons
- [ ] Checked on mobile device
- [ ] Updated personal information in HTML

---

## 🚀 Tips for Best Presentation

1. **Images**: Use 500x300px or similar aspect ratio images
2. **Descriptions**: Be concise but descriptive (2-3 sentences max)
3. **Order**: Put your best projects first
4. **URLs**: Make sure all links are complete with https://
5. **Testing**: Click everything to ensure it works

---

## Need Help?

If you need to:
- **Add more projects**: Just add another object to the array
- **Remove projects**: Delete the entire project object
- **Reorder**: Change the `id` number or physical position in array
- **Change colors**: Edit the CSS variables in `styles.css`

That's it! Happy showcasing! 🎉
