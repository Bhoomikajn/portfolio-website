# Contact Form Setup Guide

Your portfolio website has a contact form, but it needs to be connected to receive messages. Here are the best options:

## 🚀 Option 1: Formspree (Recommended - Free & Easy)

### Step 1: Sign up for Formspree
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up with your email (jnbhoomika@gmail.com)
3. Verify your email address

### Step 2: Create a Form
1. Click "New Form"
2. Name: "Portfolio Contact Form"
3. Copy the form endpoint URL (looks like: `https://formspree.io/f/xrbzgqpw`)

### Step 3: Update Your Website
1. Open `index.html`
2. Find line 350: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Example: `action="https://formspree.io/f/xrbzgqpw"`

### Step 4: Test
1. Submit the form on your website
2. Check your email (jnbhoomika@gmail.com)
3. You'll receive the form submissions there!

---

## 🔧 Option 2: Netlify Forms (If hosting on Netlify)

### Step 1: Add netlify attribute
```html
<form name="contact" method="POST" data-netlify="true">
```

### Step 2: Add hidden input
```html
<input type="hidden" name="form-name" value="contact">
```

### Step 3: Deploy to Netlify
- Messages will appear in your Netlify dashboard

---

## 📧 Option 3: EmailJS (More Advanced)

### Step 1: Sign up at EmailJS.com
1. Create account
2. Connect your email service (Gmail)
3. Create email template

### Step 2: Add EmailJS to your website
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### Step 3: Update JavaScript
- Replace the form submission code with EmailJS integration

---

## 💡 Quick Fix: Simple Email Link

If you want a quick solution, you can make the form create an email:

### Update the form action:
```html
<form action="mailto:jnbhoomika@gmail.com" method="POST" enctype="text/plain">
```

**Note**: This opens the user's email client, which may not work for everyone.

---

## 🎯 Recommended Setup (Formspree):

1. **Sign up**: https://formspree.io
2. **Get your form ID**: Copy the endpoint URL
3. **Update line 350** in index.html with your form ID
4. **Push to GitHub**: `git add . && git commit -m "Add functional contact form" && git push`
5. **Test**: Fill out the form on your live website

### After setup, you'll receive emails like this:
```
Subject: New message from portfolio website
From: visitor@example.com

Name: John Doe
Email: john@example.com
Message: Hi Bhoomika, I'd like to discuss a job opportunity...
```

---

## 📊 Where to View Messages:

### Formspree:
- **Dashboard**: https://formspree.io/forms
- **Email**: Direct to jnbhoomika@gmail.com
- **Export**: Download as CSV

### Netlify:
- **Dashboard**: Site settings → Forms
- **Email notifications**: Can be configured

### EmailJS:
- **Dashboard**: EmailJS.com dashboard
- **Email**: Your connected email

---

## 🔒 Security Features:

All these services include:
- ✅ Spam protection
- ✅ Rate limiting
- ✅ Email validation
- ✅ CAPTCHA options

Choose **Formspree** for the easiest setup!
