# Sci-Fi Novel Writing Schedule Application

![Frutiger Aero Design](https://frutiger-aero.org/img/frutiger-aero-1.webp)

## Project Overview

This interactive web application helps writers plan and track their progress on a science fiction novel from June 1st to Thanksgiving 2025 (November 27th). The application features a nostalgic Frutiger Aero design aesthetic reminiscent of mid-2000s software like Windows Vista and MSN Messenger, with glossy, translucent elements and a blue/green color scheme.

### Key Features

- **Multiple Timeline Views**: Daily, weekly, and monthly views of your writing schedule
- **Progress Tracking**: Visual progress bars and word count tracking
- **Task Management**: Interactive task lists with completion tracking
- **Publishing Options**: Three different publishing paths with specific tasks
- **Notes System**: Add notes to any day, week, or month
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Persistence**: All changes are saved to local storage

## Installation & Setup

### Local Setup

1. Clone or download this repository to your local machine
2. No build process is required - this is a static web application
3. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)

### Hosting Options

To host this application online:

1. Upload all files and folders to your web hosting service
2. Ensure the directory structure is maintained
3. Access via your domain or hosting URL

## Usage Guide

### Dashboard

![Windows Vista Aero Interface](https://www.markhendriksen.com/wp-content/uploads/2024/06/windows-vista-Frutiger-Aero.jpg)

The dashboard provides an overview of your novel writing project:

- **Overall Progress**: Visual representation of your progress through the writing schedule
- **Word Count**: Current and target word count with visual progress bar
- **Upcoming Milestones**: Key dates and goals for your writing journey
- **Today's Tasks**: Tasks scheduled for the current day

### Daily View

The daily view shows tasks and progress for each individual day:

1. Navigate between days using the previous/next buttons
2. Mark tasks as complete by clicking on them
3. Add notes specific to each day
4. Update your word count to track daily progress

### Weekly View

The weekly view provides a broader perspective:

1. See all tasks scheduled for the selected week
2. Navigate between weeks using the previous/next buttons
3. Add notes for the entire week
4. Track weekly word count goals and achievements

### Monthly View

The monthly view offers the big picture:

1. View all major tasks and milestones for the month
2. Navigate between months using the previous/next buttons
3. Add monthly notes for broader planning
4. Track monthly progress against your overall timeline

### Publishing Options

![MSN Messenger Interface](https://external-preview.redd.it/YAx45agH23sdYsqI6-II1t5PhJqok_nW3VPzj5dTX1M.jpg?auto=webp&s=3a5f88db22dff6c0fbe21d114d66ee4b3415567b)

The publishing section helps you plan the final phase of your novel:

1. Choose between Traditional, Self-Publishing, or Hybrid approaches
2. View specific tasks and timelines for each publishing path
3. Track completion of publishing-related tasks
4. Plan your post-completion strategy

## Data Structure

The application uses a JSON data structure (`schedule.json`) to store all information:

```json
{
  "project_name": "Science Fiction Novel",
  "start_date": "2025-06-01",
  "end_date": "2025-11-27",
  "current_date": "2025-06-01",
  "total_word_count": 0,
  "target_word_count": 80000,
  "overall_progress": 0,
  "phases": [...],
  "daily_schedule": [...],
  "weekly_schedule": [...],
  "monthly_schedule": [...],
  "publishing_options": [...]
}
```

### Key Data Elements:

- **Phases**: Major writing phases (Pre-Writing, Planning, First Draft, etc.)
- **Tasks**: Individual tasks within each phase
- **Daily/Weekly/Monthly Schedules**: Time-based organization of tasks
- **Publishing Options**: Different paths for publication with associated tasks

## Modifying the Schedule

### Updating Task Status

1. Click on any task in the daily, weekly, or monthly views to mark it as complete
2. The overall progress will automatically update
3. Changes are saved to local storage automatically

### Adjusting Word Count

1. Navigate to the dashboard or daily view
2. Enter your current word count in the input field
3. Click "Save" to update your progress
4. The word count progress bar will update automatically

### Adding Notes

1. Navigate to the view where you want to add notes (daily, weekly, monthly)
2. Enter your notes in the provided text area
3. Click "Save Notes" to store your thoughts
4. Notes are saved with the specific day, week, or month

### Changing Publishing Path

1. Navigate to the Publishing view
2. Select your preferred publishing option (Traditional, Self-Publishing, Hybrid)
3. The checklist will update to show tasks specific to that path
4. Your selection is saved automatically

## Customization Tips

![Frutiger Aero Glossy UI](https://preview.redd.it/random-frutiger-aero-design-i-made-v0-6f004xkb128b1.png?auto=webp&s=48f13dabc8deb4ad05d3b5cefaf6f59eae9ba290)

### Modifying the Schedule Data

To customize the writing schedule for your own project:

1. Edit the `schedule.json` file in the `data` directory
2. Adjust dates, tasks, and milestones to match your timeline
3. Modify the target word count to suit your novel's genre and goals
4. Add or remove tasks as needed

### Visual Customization

To adjust the visual design:

1. Edit `style.css` to change colors, fonts, and layout
2. Modify `interactive.css` to adjust animations and interactive elements
3. Add custom images to the `images` directory and reference them in the CSS

## Browser Compatibility

This application is compatible with:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

For the best experience, use the latest version of your preferred browser.

## Technical Details

### Technologies Used

- **HTML5**: Semantic structure and content
- **CSS3**: Styling with Frutiger Aero aesthetic
- **JavaScript**: Interactive functionality
- **LocalStorage API**: Data persistence between sessions

### Frutiger Aero Design Elements

![Frutiger Aero Translucent Panels](https://frutiger-aero.org/img/frutiger-eco-2.webp)

The application incorporates key Frutiger Aero design principles:

- Glossy, reflective surfaces
- Translucent, glass-like panels
- Soft shadows and highlights
- Rounded corners and smooth edges
- Blue and green color palette
- Subtle gradients and reflections

## Credits and Acknowledgments

- Design inspiration from Windows Vista/7 and MSN Messenger interfaces
- Novel writing process research based on standard industry practices
- Frutiger Aero design research from historical UI/UX archives
- Font: Segoe UI (Microsoft's signature font from the Vista/7 era)

## Support and Feedback

For questions, issues, or feedback about this application, please contact the development team or open an issue on the project repository.