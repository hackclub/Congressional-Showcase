# Congressional App Challenge Showcase

A showcase of apps built by high schoolers for the [Congressional App Challenge](https://www.congressionalappchallenge.us/), powered by [Hack Club](https://hackclub.com).

Each participant gets their own page to show off who they are, what they built, and a demo of their app. All pages are connected through a landing page with an interactive map.

## Add Your Project

Participated in the Congressional App Challenge? Add your page to the showcase! There are two ways to do it so pick whichever you're most comfortable with.

---

### Option A: Submit a Form (No Coding Required)

If you've never used GitHub before, or just want the easiest path, this is for you.

1. **Create a free GitHub account** at [github.com](https://github.com) (if you don't have one already)
2. **Go to the [Issues tab](../../issues)** at the top of this page
3. **Click "New Issue"** and choose **"Add My Project"**
4. **Fill out the form** with your name, app info, demo video, and location
5. **Click "Submit"** — that's it!

A maintainer will create your showcase page and let you know when it's live.

---

### Option B: Build Your Own Page

Want more control over your page? You can create and customize it yourself!

#### Step 1: Fork This Repo (Make Your Own Copy)

Click the **"Fork"** button in the top-right corner of this page. This creates a copy of the project under your GitHub account that you can freely edit.

#### Step 2: Create Your Page File

1. In your fork, click on the **`sites`** folder
2. Click **"Add file"** > **"Create new file"**
3. In the filename box at the top, type: `XX-00/index.html` where `XX-00` is your congressional district
   - Use your **state abbreviation and district number** (e.g., `CA-12/index.html`, `NY-10/index.html`)
   - Find your district at [house.gov](https://www.house.gov/representatives/find-your-representative)
   - GitHub will automatically create the folder for you
4. Open the [template file](template/index.html) in a new tab, click **"Raw"**, and copy everything
5. Paste it into your new file

#### Step 3: Customize Your Page

Edit the file you just created. Look for all the lines that say `TODO` and replace them with your own info:

- **Your name** and a short bio
- **Your app name** and what it does
- **Your demo video** — replace `YOUR_VIDEO_ID` with your YouTube video ID
  (If your video URL is `https://www.youtube.com/watch?v=abc123`, the ID is `abc123`)
- **Your links** — GitHub repo, live app, etc.

Feel free to change the colors, fonts, and layout too — make it yours! Just **don't remove** the two lines near the top and bottom that load `shared.css` and `nav.js` (they make the navigation work).

When you're done, scroll down and click **"Commit new file"**.

#### Step 4: Add Yourself to the Project List

1. Go back to the main page of your fork
2. Click on **`projects.json`**
3. Click the **pencil icon** (edit) in the top-right of the file
4. Scroll to the very end of the file. Just **before** the last `]`, add a comma after the previous `}` and paste this block:

```json
{
  "slug": "XX-00",
  "name": "Your Full Name",
  "appName": "Your App Name",
  "description": "A one-sentence description of your app.",
  "thumbnail": "sites/XX-00/thumbnail.png",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060,
    "label": "New York, NY"
  },
  "district": "XX-00",
  "state": "XX",
  "tags": ["category1", "category2"]
}
```

5. Replace the placeholder values with your actual info:
   - **`XX-00`** — your congressional district (e.g., `CA-12`). Must match the folder name you created in Step 2.
   - **`state`** — your two-letter state code (e.g., `CA`)
   - **`lat` and `lng`** — your city's coordinates (look them up at [latlong.net](https://www.latlong.net/))
   - **`tags`** — categories like `"education"`, `"health"`, `"environment"`, etc.

6. Click **"Commit changes"**

#### Step 5: Submit a Pull Request

1. Go back to the main page of your fork
2. You should see a banner that says your branch is ahead — click **"Contribute"** > **"Open pull request"**
3. Give your PR the title: **Add [Your Name] - [App Name]**
4. Click **"Create pull request"**

A maintainer will review your page, check that everything works, and merge it in!

---

## Guidelines

- Only add or edit files in your own `sites/XX-00/` folder (where `XX-00` is your district)
- Don't modify shared files, other people's pages, or the main `index.html`
- Keep your total file size under 5MB (use YouTube/Vimeo for videos)
- Be creative with your page — that's the whole point!

## Need Help?

- Check out the [example page](sites/example/) to see what a finished page looks like
- Look at the [template README](template/README.md) for customization tips
- [Open a help request](../../issues/new?template=get-help.yml) if you're stuck — no question is too small!
- Email clay@hackclub.com for help.

## License

MIT
