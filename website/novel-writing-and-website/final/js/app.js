/**
 * Sci-Fi Novel Writing Schedule
 * JavaScript Application Logic with Frutiger Aero Aesthetic
 */

// Global variables
let scheduleData = null;
let currentDayIndex = 0;
let currentWeekIndex = 0;
let currentMonthIndex = 0;
let currentView = 'dashboard';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Load schedule data
  loadScheduleData();
  
  // Set up navigation tabs
  setupNavTabs();
  
  // Set up date navigation
  setupDateNavigation();
  
  // Set up publishing options
  setupPublishingOptions();
  
  // Set up interactive elements
  setupInteractiveElements();
});

/**
 * Load schedule data from JSON file
 */
async function loadScheduleData() {
  try {
    const response = await fetch('./data/schedule.json');
    scheduleData = await response.json();
    
    // Set current date if not already set
    if (!scheduleData.current_date) {
      const today = new Date();
      scheduleData.current_date = today.toISOString().split('T')[0];
    }
    
    // Find current day index based on current date
    findCurrentDayIndex();
    
    // Find current week and month indices
    findCurrentTimeIndices();
    
    // Initialize the application with data
    initializeApp();
  } catch (error) {
    console.error('Error loading schedule data:', error);
    showNotification('Failed to load schedule data. Please try refreshing the page.', 'error');
  }
}

/**
 * Find the index of the current day in the schedule
 */
function findCurrentDayIndex() {
  if (!scheduleData || !scheduleData.daily_schedule) return;
  
  const currentDate = scheduleData.current_date;
  currentDayIndex = scheduleData.daily_schedule.findIndex(day => day.date === currentDate);
  
  // If not found, default to the first day
  if (currentDayIndex === -1) {
    currentDayIndex = 0;
  }
}

/**
 * Find current week and month indices based on current date
 */
function findCurrentTimeIndices() {
  if (!scheduleData) return;
  
  const currentDate = new Date(scheduleData.current_date);
  
  // Find current week
  currentWeekIndex = scheduleData.weekly_schedule.findIndex(week => {
    const startDate = new Date(week.start_date);
    const endDate = new Date(week.end_date);
    return currentDate >= startDate && currentDate <= endDate;
  });
  
  // If not found, default to the first week
  if (currentWeekIndex === -1) {
    currentWeekIndex = 0;
  }
  
  // Find current month
  currentMonthIndex = scheduleData.monthly_schedule.findIndex(month => {
    const startDate = new Date(month.start_date);
    const endDate = new Date(month.end_date);
    return currentDate >= startDate && currentDate <= endDate;
  });
  
  // If not found, default to the first month
  if (currentMonthIndex === -1) {
    currentMonthIndex = 0;
  }
}

/**
 * Initialize the application with loaded data
 */
function initializeApp() {
  // Update dashboard
  updateDashboard();
  
  // Initialize daily view
  updateDailyView(currentDayIndex);
  
  // Initialize weekly view
  updateWeeklyView(currentWeekIndex);
  
  // Initialize monthly view
  updateMonthlyView(currentMonthIndex);
  
  // Add Frutiger Aero visual enhancements
  applyFrutigerAeroEffects();
}

/**
 * Set up navigation tabs with smooth transitions
 */
function setupNavTabs() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const views = document.querySelectorAll('.view');
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Get the target view
      const viewId = tab.getAttribute('data-view');
      
      // Don't do anything if already on this view
      if (currentView === viewId) return;
      
      // Remove active class from all tabs
      navTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab with a slight delay for visual effect
      setTimeout(() => {
        tab.classList.add('active');
      }, 50);
      
      // Transition between views with Frutiger Aero style
      transitionToView(viewId);
      
      // Update current view
      currentView = viewId;
    });
    
    // Add hover effect
    tab.addEventListener('mouseenter', () => {
      if (!tab.classList.contains('active')) {
        addGlossEffect(tab);
      }
    });
    
    tab.addEventListener('mouseleave', () => {
      if (!tab.classList.contains('active')) {
        removeGlossEffect(tab);
      }
    });
  });
}

/**
 * Transition between views with a smooth Frutiger Aero style animation
 */
function transitionToView(viewId) {
  const views = document.querySelectorAll('.view');
  const targetView = document.getElementById(viewId);
  
  // Fade out all views
  views.forEach(view => {
    if (view.classList.contains('active')) {
      view.style.opacity = '0';
      setTimeout(() => {
        view.classList.remove('active');
        view.style.opacity = '';
      }, 300);
    }
  });
  
  // Fade in target view
  setTimeout(() => {
    targetView.classList.add('active');
    targetView.style.opacity = '0';
    
    setTimeout(() => {
      targetView.style.opacity = '1';
    }, 50);
  }, 350);
}

/**
 * Set up date navigation buttons with enhanced interactivity
 */
function setupDateNavigation() {
  // Daily navigation
  setupNavigationButton('prev-day', () => {
    if (currentDayIndex > 0) {
      currentDayIndex--;
      updateDailyView(currentDayIndex);
    } else {
      shakeElement(document.getElementById('prev-day'));
    }
  });
  
  setupNavigationButton('next-day', () => {
    if (currentDayIndex < scheduleData.daily_schedule.length - 1) {
      currentDayIndex++;
      updateDailyView(currentDayIndex);
    } else {
      shakeElement(document.getElementById('next-day'));
    }
  });
  
  // Weekly navigation
  setupNavigationButton('prev-week', () => {
    if (currentWeekIndex > 0) {
      currentWeekIndex--;
      updateWeeklyView(currentWeekIndex);
    } else {
      shakeElement(document.getElementById('prev-week'));
    }
  });
  
  setupNavigationButton('next-week', () => {
    if (currentWeekIndex < scheduleData.weekly_schedule.length - 1) {
      currentWeekIndex++;
      updateWeeklyView(currentWeekIndex);
    } else {
      shakeElement(document.getElementById('next-week'));
    }
  });
  
  // Monthly navigation
  setupNavigationButton('prev-month', () => {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      updateMonthlyView(currentMonthIndex);
    } else {
      shakeElement(document.getElementById('prev-month'));
    }
  });
  
  setupNavigationButton('next-month', () => {
    if (currentMonthIndex < scheduleData.monthly_schedule.length - 1) {
      currentMonthIndex++;
      updateMonthlyView(currentMonthIndex);
    } else {
      shakeElement(document.getElementById('next-month'));
    }
  });
  
  // Save word count button with enhanced interaction
  const saveWordCountBtn = document.getElementById('save-word-count');
  saveWordCountBtn.addEventListener('click', () => {
    const result = saveWordCount();
    if (result) {
      pulseElement(saveWordCountBtn);
    }
  });
  
  // Save notes buttons with enhanced interaction
  setupSaveButton('save-notes', () => saveNotes('daily'));
  setupSaveButton('save-weekly-notes', () => saveNotes('weekly'));
  setupSaveButton('save-monthly-notes', () => saveNotes('monthly'));
  
  // Day completion checkbox with visual feedback
  const completionCheckbox = document.getElementById('daily-completed');
  completionCheckbox.addEventListener('change', (e) => {
    markDayComplete(e.target.checked);
    
    // Visual feedback
    const taskCompletion = completionCheckbox.closest('.task-completion');
    if (e.target.checked) {
      taskCompletion.classList.add('completed');
      showNotification('Day marked as complete!', 'success');
    } else {
      taskCompletion.classList.remove('completed');
      showNotification('Day marked as incomplete', 'info');
    }
  });
}

/**
 * Set up a navigation button with enhanced interactivity
 */
function setupNavigationButton(id, callback) {
  const button = document.getElementById(id);
  if (!button) return;
  
  button.addEventListener('click', callback);
  
  // Add hover effects
  button.addEventListener('mouseenter', () => {
    addGlossEffect(button);
  });
  
  button.addEventListener('mouseleave', () => {
    removeGlossEffect(button);
  });
  
  // Add click effect
  button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.95)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = 'scale(1)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
}

/**
 * Set up a save button with enhanced interactivity
 */
function setupSaveButton(id, callback) {
  const button = document.getElementById(id);
  if (!button) return;
  
  button.addEventListener('click', () => {
    const result = callback();
    if (result !== false) {
      pulseElement(button);
    }
  });
  
  // Add hover effects
  button.addEventListener('mouseenter', () => {
    addGlossEffect(button);
  });
  
  button.addEventListener('mouseleave', () => {
    removeGlossEffect(button);
  });
}

/**
 * Set up publishing options with enhanced interactivity
 */
function setupPublishingOptions() {
  const publishingOptions = document.querySelectorAll('input[name="publishing-option"]');
  const publishingDivs = document.querySelectorAll('.publishing-option');
  
  publishingOptions.forEach((option, index) => {
    option.addEventListener('change', (e) => {
      const selectedOption = e.target.value;
      updatePublishingChecklist(selectedOption);
      
      // Add visual feedback
      publishingDivs.forEach(div => {
        div.classList.remove('selected');
      });
      
      publishingDivs[index].classList.add('selected');
      pulseElement(publishingDivs[index]);
    });
  });
  
  // Add hover effects to publishing options
  publishingDivs.forEach(div => {
    div.addEventListener('mouseenter', () => {
      if (!div.classList.contains('selected')) {
        div.style.transform = 'translateY(-3px)';
        div.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      }
    });
    
    div.addEventListener('mouseleave', () => {
      if (!div.classList.contains('selected')) {
        div.style.transform = '';
        div.style.boxShadow = '';
      }
    });
  });
}

/**
 * Set up additional interactive elements
 */
function setupInteractiveElements() {
  // Make task lists interactive
  setupTaskLists();
  
  // Make calendars interactive
  setupCalendarInteractions();
  
  // Add keyboard navigation
  setupKeyboardNavigation();
  
  // Add word count input enhancements
  enhanceWordCountInput();
}

/**
 * Set up interactive task lists
 */
function setupTaskLists() {
  // Make dashboard task list interactive
  const dashboardTaskList = document.getElementById('today-task-list');
  if (dashboardTaskList) {
    makeTaskListInteractive(dashboardTaskList);
  }
  
  // Make daily tasks list interactive
  const dailyTasksList = document.getElementById('daily-tasks-list');
  if (dailyTasksList) {
    makeTaskListInteractive(dailyTasksList);
  }
}

/**
 * Make a task list interactive
 */
function makeTaskListInteractive(taskList) {
  // Add click listener to the list
  taskList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    
    // Toggle selected state
    const wasSelected = li.classList.contains('selected');
    
    // Remove selected from all items
    taskList.querySelectorAll('li').forEach(item => {
      item.classList.remove('selected');
    });
    
    // Add selected to clicked item if it wasn't already selected
    if (!wasSelected) {
      li.classList.add('selected');
      pulseElement(li);
    }
  });
}

/**
 * Set up calendar interactions
 */
function setupCalendarInteractions() {
  // Weekly calendar interactions
  document.addEventListener('click', (e) => {
    const calendarDay = e.target.closest('.calendar-day');
    if (calendarDay) {
      highlightCalendarDay(calendarDay);
    }
    
    const monthDay = e.target.closest('.month-day:not(.empty)');
    if (monthDay) {
      highlightCalendarDay(monthDay);
    }
  });
}

/**
 * Highlight a calendar day and show details
 */
function highlightCalendarDay(dayElement) {
  // Remove highlight from all days
  const calendar = dayElement.closest('.weekly-calendar, .monthly-calendar');
  if (!calendar) return;
  
  calendar.querySelectorAll('.calendar-day, .month-day').forEach(day => {
    day.classList.remove('highlighted');
  });
  
  // Add highlight to selected day
  dayElement.classList.add('highlighted');
  pulseElement(dayElement);
  
  // Get day number if available
  const dayNumber = dayElement.querySelector('.day-date, .month-day-number');
  if (!dayNumber) return;
  
  // Find the corresponding day in the schedule
  const dayNum = parseInt(dayNumber.textContent);
  if (isNaN(dayNum)) return;
  
  let targetDayIndex;
  
  if (calendar.classList.contains('weekly-calendar')) {
    // For weekly view
    const weekData = scheduleData.weekly_schedule[currentWeekIndex];
    const startDate = new Date(weekData.start_date);
    
    // Find the day in the daily schedule
    targetDayIndex = scheduleData.daily_schedule.findIndex(day => {
      const date = new Date(day.date);
      return date.getDate() === dayNum && 
             date >= startDate && 
             date <= new Date(weekData.end_date);
    });
  } else {
    // For monthly view
    const monthData = scheduleData.monthly_schedule[currentMonthIndex];
    const startDate = new Date(monthData.start_date);
    
    // Find the day in the daily schedule
    targetDayIndex = scheduleData.daily_schedule.findIndex(day => {
      const date = new Date(day.date);
      return date.getDate() === dayNum && 
             date >= startDate && 
             date <= new Date(monthData.end_date);
    });
  }
  
  // If found, update the daily view and switch to it
  if (targetDayIndex !== -1) {
    currentDayIndex = targetDayIndex;
    updateDailyView(currentDayIndex);
    
    // Switch to daily view
    const dailyTab = document.querySelector('.nav-tab[data-view="daily"]');
    if (dailyTab) {
      dailyTab.click();
    }
  }
}

/**
 * Set up keyboard navigation
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Only process if not in an input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    switch (e.key) {
      case 'ArrowLeft':
        navigatePrevious();
        break;
      case 'ArrowRight':
        navigateNext();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        // Switch tabs with number keys
        const tabIndex = parseInt(e.key) - 1;
        const tabs = document.querySelectorAll('.nav-tab');
        if (tabs[tabIndex]) {
          tabs[tabIndex].click();
        }
        break;
    }
  });
}

/**
 * Navigate to previous item based on current view
 */
function navigatePrevious() {
  switch (currentView) {
    case 'daily':
      document.getElementById('prev-day').click();
      break;
    case 'weekly':
      document.getElementById('prev-week').click();
      break;
    case 'monthly':
      document.getElementById('prev-month').click();
      break;
  }
}

/**
 * Navigate to next item based on current view
 */
function navigateNext() {
  switch (currentView) {
    case 'daily':
      document.getElementById('next-day').click();
      break;
    case 'weekly':
      document.getElementById('next-week').click();
      break;
    case 'monthly':
      document.getElementById('next-month').click();
      break;
  }
}

/**
 * Enhance word count input with real-time validation and feedback
 */
function enhanceWordCountInput() {
  const wordCountInput = document.getElementById('daily-word-count');
  if (!wordCountInput) return;
  
  wordCountInput.addEventListener('input', () => {
    const value = parseInt(wordCountInput.value) || 0;
    
    // Visual feedback based on value
    if (value > 0) {
      wordCountInput.classList.add('has-value');
    } else {
      wordCountInput.classList.remove('has-value');
    }
    
    // Update progress in real-time (visual only, not saved)
    updateWordCountVisual(value);
  });
  
  // Add enter key support
  wordCountInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('save-word-count').click();
    }
  });
}

/**
 * Update word count visual feedback without saving
 */
function updateWordCountVisual(wordCount) {
  if (!scheduleData) return;
  
  // Calculate what the total would be
  const currentTotal = scheduleData.daily_schedule.reduce(
    (total, day, index) => {
      if (index === currentDayIndex) {
        return total + wordCount;
      }
      return total + (day.word_count || 0);
    }, 0
  );
  
  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((currentTotal / scheduleData.target_word_count) * 100),
    100
  );
  
  // Update visual elements
  const progressBar = document.querySelector('.daily-progress .progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
    
    // Add color feedback
    if (progressPercentage < 25) {
      progressBar.style.background = 'linear-gradient(to right, #ff9999, #ffcccc)';
    } else if (progressPercentage < 50) {
      progressBar.style.background = 'linear-gradient(to right, #ffcc99, #ffe6cc)';
    } else if (progressPercentage < 75) {
      progressBar.style.background = 'linear-gradient(to right, #ffff99, #ffffcc)';
    } else {
      progressBar.style.background = 'linear-gradient(to right, #99ff99, #ccffcc)';
    }
  }
}

/**
 * Update the dashboard with current data and enhanced visuals
 */
function updateDashboard() {
  if (!scheduleData) return;
  
  // Update overall progress with animation
  const progressBar = document.getElementById('overall-progress-bar');
  const progressPercentage = document.getElementById('overall-progress-percentage');
  
  animateProgressBar(progressBar, scheduleData.overall_progress);
  progressPercentage.textContent = `${scheduleData.overall_progress}%`;
  
  // Update word count with animation
  animateCounter(
    document.getElementById('current-word-count'), 
    scheduleData.total_word_count
  );
  document.getElementById('target-word-count').textContent = 
    scheduleData.target_word_count.toLocaleString();
  
  // Update current phase
  const currentDate = new Date(scheduleData.current_date);
  let currentPhase = '';
  
  for (const phase of scheduleData.phases) {
    const phaseStart = new Date(phase.start_date);
    const phaseEnd = new Date(phase.end_date);
    
    if (currentDate >= phaseStart && currentDate <= phaseEnd) {
      currentPhase = phase.name;
      break;
    }
  }
  
  const phaseDisplay = document.getElementById('current-phase-display');
  phaseDisplay.textContent = currentPhase;
  pulseElement(phaseDisplay);
  
  // Update milestones with enhanced visuals
  updateMilestones();
  
  // Update today's tasks with enhanced visuals
  updateTodayTasks();
}

/**
 * Update milestones with enhanced visuals
 */
function updateMilestones() {
  const milestoneList = document.getElementById('milestone-list');
  if (!milestoneList || !scheduleData) return;
  
  milestoneList.innerHTML = '';
  
  // Find upcoming milestones
  const currentDate = new Date(scheduleData.current_date);
  const upcomingMilestones = scheduleData.daily_schedule
    .filter(day => day.milestone && new Date(day.date) >= currentDate)
    .slice(0, 3); // Show next 3 milestones
  
  if (upcomingMilestones.length > 0) {
    upcomingMilestones.forEach((day, index) => {
      const li = document.createElement('li');
      const date = new Date(day.date);
      
      // Calculate days until milestone
      const daysUntil = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));
      const daysText = daysUntil === 0 ? 'Today' : 
                      daysUntil === 1 ? 'Tomorrow' : 
                      `In ${daysUntil} days`;
      
      li.innerHTML = `
        <div class="milestone-date">${formatDate(date)}</div>
        <div class="milestone-text">${day.milestone}</div>
        <div class="milestone-countdown">${daysText}</div>
      `;
      
      // Add staggered animation
      setTimeout(() => {
        milestoneList.appendChild(li);
        fadeInElement(li);
      }, index * 200);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No upcoming milestones';
    milestoneList.appendChild(li);
  }
}

/**
 * Update today's tasks with enhanced visuals
 */
function updateTodayTasks() {
  const todayTaskList = document.getElementById('today-task-list');
  if (!todayTaskList || !scheduleData) return;
  
  todayTaskList.innerHTML = '';
  
  // Find today's entry
  const todayEntry = scheduleData.daily_schedule.find(day => day.date === scheduleData.current_date);
  
  if (todayEntry && todayEntry.active_tasks.length > 0) {
    todayEntry.active_tasks.forEach((task, index) => {
      const li = document.createElement('li');
      
      // Find the task details from phases
      const taskDetails = findTaskDetails(task, todayEntry.phase);
      
      li.innerHTML = `
        <span class="task-name">${task}</span>
        ${taskDetails ? `<span class="task-details">${taskDetails}</span>` : ''}
      `;
      
      // Add staggered animation
      setTimeout(() => {
        todayTaskList.appendChild(li);
        fadeInElement(li);
      }, index * 150);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No tasks for today';
    todayTaskList.appendChild(li);
  }
}

/**
 * Find task details from the phases data
 */
function findTaskDetails(taskName, phaseName) {
  if (!scheduleData || !scheduleData.phases) return null;
  
  // Find the phase
  const phase = scheduleData.phases.find(p => p.name === phaseName);
  if (!phase || !phase.tasks) return null;
  
  // Find the task
  const task = phase.tasks.find(t => t.name === taskName);
  if (!task || !task.subtasks) return null;
  
  // Return the first subtask as a preview
  return task.subtasks.length > 0 ? 
    `${task.subtasks[0].name}${task.subtasks.length > 1 ? ' +' + (task.subtasks.length - 1) : ''}` : 
    null;
}

/**
 * Update the daily view with the selected day's data and enhanced interactivity
 */
function updateDailyView(dayIndex) {
  if (!scheduleData || !scheduleData.daily_schedule[dayIndex]) return;
  
  const dayData = scheduleData.daily_schedule[dayIndex];
  const date = new Date(dayData.date);
  
  // Update date display with animation
  const dateDisplay = document.getElementById('current-day-display');
  const oldText = dateDisplay.textContent;
  const newText = formatDate(date);
  
  if (oldText !== newText) {
    fadeTextTransition(dateDisplay, newText);
  }
  
  // Update phase with animation
  const phaseDisplay = document.getElementById('daily-phase-display');
  fadeTextTransition(phaseDisplay, dayData.phase || 'No phase assigned');
  
  // Update tasks with enhanced visuals
  const tasksList = document.getElementById('daily-tasks-list');
  tasksList.innerHTML = '';
  
  if (dayData.active_tasks && dayData.active_tasks.length > 0) {
    dayData.active_tasks.forEach((task, index) => {
      const li = document.createElement('li');
      
      // Find the task details
      const taskDetails = findTaskDetails(task, dayData.phase);
      const subtasks = getTaskSubtasks(task, dayData.phase);
      
      li.innerHTML = `
        <div class="task-header">
          <span class="task-name">${task}</span>
          <span class="task-toggle">${subtasks.length > 0 ? '▼' : ''}</span>
        </div>
        ${subtasks.length > 0 ? `
          <div class="subtasks-container" style="display: none;">
            <ul class="subtasks-list">
              ${subtasks.map(subtask => `
                <li>
                  <label>
                    <input type="checkbox" ${subtask.completed ? 'checked' : ''}>
                    <span>${subtask.name}</span>
                  </label>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      `;
      
      // Add staggered animation
      setTimeout(() => {
        tasksList.appendChild(li);
        fadeInElement(li);
        
        // Add toggle functionality for subtasks
        const taskToggle = li.querySelector('.task-toggle');
        const subtasksContainer = li.querySelector('.subtasks-container');
        
        if (taskToggle && subtasksContainer) {
          taskToggle.addEventListener('click', () => {
            const isHidden = subtasksContainer.style.display === 'none';
            subtasksContainer.style.display = isHidden ? 'block' : 'none';
            taskToggle.textContent = isHidden ? '▲' : '▼';
            
            if (isHidden) {
              slideDown(subtasksContainer);
            } else {
              slideUp(subtasksContainer);
            }
          });
        }
        
        // Add subtask checkbox functionality
        const checkboxes = li.querySelectorAll('.subtasks-list input[type="checkbox"]');
        checkboxes.forEach((checkbox, subtaskIndex) => {
          checkbox.addEventListener('change', () => {
            updateSubtaskCompletion(task, dayData.phase, subtaskIndex, checkbox.checked);
          });
        });
      }, index * 100);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No tasks for this day';
    tasksList.appendChild(li);
  }
  
  // Update word count
  document.getElementById('daily-word-count').value = dayData.word_count || 0;
  
  // Update completion status
  document.getElementById('daily-completed').checked = dayData.completed || false;
  
  // Update notes
  document.getElementById('daily-notes-input').value = dayData.notes || '';
  
  // Add milestone indicator if present
  const dailyDetails = document.querySelector('.daily-details');
  const existingMilestone = document.querySelector('.daily-milestone');
  
  if (existingMilestone) {
    existingMilestone.remove();
  }
  
  if (dayData.milestone) {
    const milestoneDiv = document.createElement('div');
    milestoneDiv.className = 'daily-milestone';
    milestoneDiv.innerHTML = `
      <h3>Milestone</h3>
      <div class="milestone-text">${dayData.milestone}</div>
    `;
    
    dailyDetails.appendChild(milestoneDiv);
    pulseElement(milestoneDiv);
  }
  
  // Update progress visualization
  updateDailyProgressVisualization(dayData);
}

/**
 * Get subtasks for a specific task
 */
function getTaskSubtasks(taskName, phaseName) {
  if (!scheduleData || !scheduleData.phases) return [];
  
  // Find the phase
  const phase = scheduleData.phases.find(p => p.name === phaseName);
  if (!phase || !phase.tasks) return [];
  
  // Find the task
  const task = phase.tasks.find(t => t.name === taskName);
  if (!task || !task.subtasks) return [];
  
  return task.subtasks;
}

/**
 * Update subtask completion status
 */
function updateSubtaskCompletion(taskName, phaseName, subtaskIndex, isCompleted) {
  if (!scheduleData || !scheduleData.phases) return;
  
  // Find the phase
  const phase = scheduleData.phases.find(p => p.name === phaseName);
  if (!phase || !phase.tasks) return;
  
  // Find the task
  const task = phase.tasks.find(t => t.name === taskName);
  if (!task || !task.subtasks || !task.subtasks[subtaskIndex]) return;
  
  // Update the subtask
  task.subtasks[subtaskIndex].completed = isCompleted;
  
  // Check if all subtasks are completed
  const allCompleted = task.subtasks.every(subtask => subtask.completed);
  task.completed = allCompleted;
  
  // Save the updated data
  saveScheduleData();
  
  // Show notification
  if (isCompleted) {
    showNotification('Subtask marked as complete!', 'success');
  } else {
    showNotification('Subtask marked as incomplete', 'info');
  }
}

/**
 * Update daily progress visualization
 */
function updateDailyProgressVisualization(dayData) {
  // Add a progress bar to the daily view if it doesn't exist
  let progressContainer = document.querySelector('.daily-progress .progress-container');
  
  if (!progressContainer) {
    const dailyProgress = document.querySelector('.daily-progress');
    if (!dailyProgress) return;
    
    progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.innerHTML = `
      <div class="progress-label">Daily Progress</div>
      <div class="progress-bar-container">
        <div class="progress-bar" id="daily-progress-bar"></div>
      </div>
      <div class="progress-percentage" id="daily-progress-percentage">0%</div>
    `;
    
    dailyProgress.insertBefore(progressContainer, dailyProgress.firstChild);
  }
  
  // Calculate progress based on subtasks
  let totalSubtasks = 0;
  let completedSubtasks = 0;
  
  if (dayData.active_tasks && dayData.active_tasks.length > 0) {
    dayData.active_tasks.forEach(taskName => {
      const subtasks = getTaskSubtasks(taskName, dayData.phase);
      totalSubtasks += subtasks.length;
      completedSubtasks += subtasks.filter(subtask => subtask.completed).length;
    });
  }
  
  // Calculate percentage
  const progressPercentage = totalSubtasks > 0 ? 
    Math.round((completedSubtasks / totalSubtasks) * 100) : 
    (dayData.completed ? 100 : 0);
  
  // Update progress bar
  const progressBar = document.getElementById('daily-progress-bar');
  const progressText = document.getElementById('daily-progress-percentage');
  
  if (progressBar && progressText) {
    animateProgressBar(progressBar, progressPercentage);
    progressText.textContent = `${progressPercentage}%`;
  }
}

/**
 * Update the weekly view with the selected week's data and enhanced interactivity
 */
function updateWeeklyView(weekIndex) {
  if (!scheduleData || !scheduleData.weekly_schedule[weekIndex]) return;
  
  const weekData = scheduleData.weekly_schedule[weekIndex];
  const startDate = new Date(weekData.start_date);
  const endDate = new Date(weekData.end_date);
  
  // Update week display with animation
  const weekDisplay = document.getElementById('current-week-display');
  fadeTextTransition(
    weekDisplay, 
    `${weekData.week_number}: ${formatDate(startDate)} - ${formatDate(endDate)}`
  );
  
  // Update phases with animation
  const phasesDisplay = document.getElementById('weekly-phases-display');
  fadeTextTransition(
    phasesDisplay,
    weekData.phases.join(', ') || 'No phases assigned'
  );
  
  // Update goals with enhanced visuals
  const goalsList = document.getElementById('weekly-goals-list');
  goalsList.innerHTML = '';
  
  if (weekData.goals && weekData.goals.length > 0) {
    weekData.goals.forEach((goal, index) => {
      const li = document.createElement('li');
      li.textContent = goal;
      
      // Add staggered animation
      setTimeout(() => {
        goalsList.appendChild(li);
        fadeInElement(li);
      }, index * 100);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No goals for this week';
    goalsList.appendChild(li);
  }
  
  // Update progress with animation
  const progressBar = document.getElementById('weekly-progress-bar');
  const progressPercentage = document.getElementById('weekly-progress-percentage');
  const completionPercentage = calculateWeekCompletionPercentage(weekData);
  
  animateProgressBar(progressBar, completionPercentage);
  progressPercentage.textContent = `${completionPercentage}%`;
  
  // Update word count with animation
  animateCounter(
    document.getElementById('weekly-word-count'),
    weekData.total_word_count || 0
  );
  
  // Update notes
  document.getElementById('weekly-notes-input').value = weekData.notes || '';
  
  // Update calendar with enhanced interactivity
  updateWeeklyCalendar(weekData);
}

/**
 * Update the weekly calendar display with enhanced interactivity
 */
function updateWeeklyCalendar(weekData) {
  const calendar = document.getElementById('weekly-calendar');
  calendar.innerHTML = '';
  
  // Find the daily entries for this week
  const startDate = new Date(weekData.start_date);
  const endDate = new Date(weekData.end_date);
  
  const dailyEntries = scheduleData.daily_schedule.filter(day => {
    const date = new Date(day.date);
    return date >= startDate && date <= endDate;
  });
  
  // Create calendar days
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let i = 0; i < 7; i++) {
    const dayEntry = dailyEntries.find(day => new Date(day.date).getDay() === i);
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (dayEntry) {
      const date = new Date(dayEntry.date);
      
      if (dayEntry.completed) {
        dayElement.classList.add('day-completed');
      }
      
      // Check if this is the current day
      const isCurrentDay = dayEntry.date === scheduleData.current_date;
      if (isCurrentDay) {
        dayElement.classList.add('current-day');
      }
      
      // Calculate task completion percentage
      let taskCompletion = 0;
      if (dayEntry.active_tasks && dayEntry.active_tasks.length > 0) {
        let totalSubtasks = 0;
        let completedSubtasks = 0;
        
        dayEntry.active_tasks.forEach(taskName => {
          const subtasks = getTaskSubtasks(taskName, dayEntry.phase);
          totalSubtasks += subtasks.length;
          completedSubtasks += subtasks.filter(subtask => subtask.completed).length;
        });
        
        taskCompletion = totalSubtasks > 0 ? 
          Math.round((completedSubtasks / totalSubtasks) * 100) : 
          (dayEntry.completed ? 100 : 0);
      }
      
      dayElement.innerHTML = `
        <div class="day-header">${dayNames[i]}</div>
        <div class="day-date">${date.getDate()}</div>
        <div class="day-content">
          ${dayEntry.active_tasks.length > 0 ? 
            `<div class="day-task">${dayEntry.active_tasks[0]}</div>` : 
            '<div class="day-task">No tasks</div>'}
          ${dayEntry.milestone ? 
            `<div class="day-milestone" title="${dayEntry.milestone}">★</div>` : ''}
          ${dayEntry.word_count > 0 ? 
            `<div class="day-word-count">${dayEntry.word_count} words</div>` : ''}
        </div>
        <div class="day-progress-container">
          <div class="day-progress-bar" style="width: ${taskCompletion}%"></div>
        </div>
      `;
      
      // Add data attributes for interaction
      dayElement.setAttribute('data-date', dayEntry.date);
      dayElement.setAttribute('data-index', scheduleData.daily_schedule.indexOf(dayEntry));
      
      // Add click handler to navigate to this day
      dayElement.addEventListener('click', () => {
        const dayIndex = parseInt(dayElement.getAttribute('data-index'));
        if (!isNaN(dayIndex)) {
          currentDayIndex = dayIndex;
          updateDailyView(currentDayIndex);
          
          // Switch to daily view
          const dailyTab = document.querySelector('.nav-tab[data-view="daily"]');
          if (dailyTab) {
            dailyTab.click();
          }
        }
      });
    } else {
      dayElement.innerHTML = `
        <div class="day-header">${dayNames[i]}</div>
        <div class="day-content">N/A</div>
      `;
    }
    
    calendar.appendChild(dayElement);
  }
}

/**
 * Update the monthly view with the selected month's data and enhanced interactivity
 */
function updateMonthlyView(monthIndex) {
  if (!scheduleData || !scheduleData.monthly_schedule[monthIndex]) return;
  
  const monthData = scheduleData.monthly_schedule[monthIndex];
  
  // Update month display with animation
  const monthDisplay = document.getElementById('current-month-display');
  fadeTextTransition(monthDisplay, monthData.month);
  
  // Update phases with animation
  const phasesDisplay = document.getElementById('monthly-phases-display');
  fadeTextTransition(
    phasesDisplay,
    monthData.phases.join(', ') || 'No phases assigned'
  );
  
  // Update goals with enhanced visuals
  const goalsList = document.getElementById('monthly-goals-list');
  goalsList.innerHTML = '';
  
  if (monthData.major_goals && monthData.major_goals.length > 0) {
    monthData.major_goals.forEach((goal, index) => {
      const li = document.createElement('li');
      li.textContent = goal;
      
      // Add staggered animation
      setTimeout(() => {
        goalsList.appendChild(li);
        fadeInElement(li);
      }, index * 100);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No major goals for this month';
    goalsList.appendChild(li);
  }
  
  // Update progress with animation
  const progressBar = document.getElementById('monthly-progress-bar');
  const progressPercentage = document.getElementById('monthly-progress-percentage');
  const completionPercentage = calculateMonthCompletionPercentage(monthData);
  
  animateProgressBar(progressBar, completionPercentage);
  progressPercentage.textContent = `${completionPercentage}%`;
  
  // Update word count with animation
  animateCounter(
    document.getElementById('monthly-word-count'),
    monthData.total_word_count || 0
  );
  
  // Update notes
  document.getElementById('monthly-notes-input').value = monthData.notes || '';
  
  // Update calendar with enhanced interactivity
  updateMonthlyCalendar(monthData);
}

/**
 * Update the monthly calendar display with enhanced interactivity
 */
function updateMonthlyCalendar(monthData) {
  const calendar = document.getElementById('monthly-calendar');
  calendar.innerHTML = '';
  
  // Find the daily entries for this month
  const startDate = new Date(monthData.start_date);
  const endDate = new Date(monthData.end_date);
  
  const dailyEntries = scheduleData.daily_schedule.filter(day => {
    const date = new Date(day.date);
    return date >= startDate && date <= endDate;
  });
  
  // Create calendar header (day names)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  dayNames.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'month-day-header';
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });
  
  // Calculate first day of month and add empty cells
  const firstDay = startDate.getDay();
  
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'month-day empty';
    calendar.appendChild(emptyDay);
  }
  
  // Add days of the month
  dailyEntries.forEach(dayEntry => {
    const date = new Date(dayEntry.date);
    const dayElement = document.createElement('div');
    dayElement.className = 'month-day';
    
    if (dayEntry.completed) {
      dayElement.classList.add('completed');
    }
    
    if (dayEntry.milestone) {
      dayElement.classList.add('milestone');
    }
    
    // Check if this is the current day
    const isCurrentDay = dayEntry.date === scheduleData.current_date;
    if (isCurrentDay) {
      dayElement.classList.add('current-day');
    }
    
    // Calculate task completion percentage
    let taskCompletion = 0;
    if (dayEntry.active_tasks && dayEntry.active_tasks.length > 0) {
      let totalSubtasks = 0;
      let completedSubtasks = 0;
      
      dayEntry.active_tasks.forEach(taskName => {
        const subtasks = getTaskSubtasks(taskName, dayEntry.phase);
        totalSubtasks += subtasks.length;
        completedSubtasks += subtasks.filter(subtask => subtask.completed).length;
      });
      
      taskCompletion = totalSubtasks > 0 ? 
        Math.round((completedSubtasks / totalSubtasks) * 100) : 
        (dayEntry.completed ? 100 : 0);
    }
    
    dayElement.innerHTML = `
      <div class="month-day-number">${date.getDate()}</div>
      <div class="month-day-content">
        ${dayEntry.milestone ? '<span class="month-milestone" title="' + dayEntry.milestone + '">★</span>' : ''}
        ${dayEntry.word_count > 0 ? '<span class="month-word-count">' + dayEntry.word_count + '</span>' : ''}
      </div>
      ${taskCompletion > 0 ? 
        `<div class="month-progress-bar" style="width: ${taskCompletion}%"></div>` : ''}
    `;
    
    // Add data attributes for interaction
    dayElement.setAttribute('data-date', dayEntry.date);
    dayElement.setAttribute('data-index', scheduleData.daily_schedule.indexOf(dayEntry));
    
    // Add click handler to navigate to this day
    dayElement.addEventListener('click', () => {
      const dayIndex = parseInt(dayElement.getAttribute('data-index'));
      if (!isNaN(dayIndex)) {
        currentDayIndex = dayIndex;
        updateDailyView(currentDayIndex);
        
        // Switch to daily view
        const dailyTab = document.querySelector('.nav-tab[data-view="daily"]');
        if (dailyTab) {
          dailyTab.click();
        }
      }
    });
    
    calendar.appendChild(dayElement);
  });
}

/**
 * Update the publishing checklist based on selected option with enhanced interactivity
 */
function updatePublishingChecklist(option) {
  const checklistContainer = document.getElementById('publishing-checklist-items');
  checklistContainer.innerHTML = '';
  
  if (!scheduleData || !scheduleData.publishing_options) return;
  
  // Find the selected publishing option
  const selectedOption = scheduleData.publishing_options.find(opt => 
    opt.name.toLowerCase().includes(option)
  );
  
  if (selectedOption && selectedOption.steps) {
    // Create checklist items with staggered animation
    selectedOption.steps.forEach((step, index) => {
      const checkItem = document.createElement('div');
      checkItem.className = 'checklist-item';
      
      checkItem.innerHTML = `
        <label>
          <input type="checkbox" class="publishing-step" ${selectedOption.selected ? 'checked' : ''}>
          <span>${step}</span>
        </label>
      `;
      
      // Add staggered animation
      setTimeout(() => {
        checklistContainer.appendChild(checkItem);
        fadeInElement(checkItem);
        
        // Add checkbox functionality
        const checkbox = checkItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          // Visual feedback
          if (checkbox.checked) {
            checkItem.classList.add('completed');
          } else {
            checkItem.classList.remove('completed');
          }
        });
      }, index * 100);
    });
    
    // Mark the option as selected in the data
    scheduleData.publishing_options.forEach(opt => {
      opt.selected = opt.name.toLowerCase().includes(option);
    });
    
    // Save the updated data
    saveScheduleData();
  } else {
    checklistContainer.innerHTML = '<p class="checklist-placeholder">No steps available for this option</p>';
  }
}

/**
 * Save the word count for the current day with enhanced feedback
 */
function saveWordCount() {
  if (!scheduleData) return false;
  
  const wordCountInput = document.getElementById('daily-word-count');
  const wordCount = parseInt(wordCountInput.value) || 0;
  
  // Update the current day's word count
  const currentDay = scheduleData.daily_schedule[currentDayIndex];
  
  // Check if the word count has changed
  if (currentDay.word_count === wordCount) {
    showNotification('Word count unchanged', 'info');
    return false;
  }
  
  currentDay.word_count = wordCount;
  
  // Update total word count
  scheduleData.total_word_count = scheduleData.daily_schedule.reduce(
    (total, day) => total + (day.word_count || 0), 0
  );
  
  // Update overall progress
  scheduleData.overall_progress = Math.min(
    Math.round((scheduleData.total_word_count / scheduleData.target_word_count) * 100),
    100
  );
  
  // Update weekly and monthly word counts
  updateAggregateWordCounts();
  
  // Update the dashboard
  updateDashboard();
  
  // Save the updated data
  saveScheduleData();
  
  // Show confirmation
  showNotification('Word count saved successfully!', 'success');
  
  return true;
}

/**
 * Save notes for the current view with enhanced feedback
 */
function saveNotes(view) {
  if (!scheduleData) return false;
  
  let notes = '';
  let updateFunction = null;
  let oldNotes = '';
  
  switch (view) {
    case 'daily':
      notes = document.getElementById('daily-notes-input').value;
      oldNotes = scheduleData.daily_schedule[currentDayIndex].notes || '';
      scheduleData.daily_schedule[currentDayIndex].notes = notes;
      updateFunction = () => updateDailyView(currentDayIndex);
      break;
    case 'weekly':
      notes = document.getElementById('weekly-notes-input').value;
      oldNotes = scheduleData.weekly_schedule[currentWeekIndex].notes || '';
      scheduleData.weekly_schedule[currentWeekIndex].notes = notes;
      updateFunction = () => updateWeeklyView(currentWeekIndex);
      break;
    case 'monthly':
      notes = document.getElementById('monthly-notes-input').value;
      oldNotes = scheduleData.monthly_schedule[currentMonthIndex].notes || '';
      scheduleData.monthly_schedule[currentMonthIndex].notes = notes;
      updateFunction = () => updateMonthlyView(currentMonthIndex);
      break;
  }
  
  // Check if notes have changed
  if (notes === oldNotes) {
    showNotification('Notes unchanged', 'info');
    return false;
  }
  
  // Save the updated data
  saveScheduleData();
  
  // Update the view
  if (updateFunction) {
    updateFunction();
  }
  
  // Show confirmation
  showNotification('Notes saved successfully!', 'success');
  
  return true;
}

/**
 * Mark the current day as complete or incomplete with enhanced feedback
 */
function markDayComplete(isComplete) {
  if (!scheduleData) return false;
  
  // Update the current day's completion status
  scheduleData.daily_schedule[currentDayIndex].completed = isComplete;
  
  // Save the updated data
  saveScheduleData();
  
  // Update the view
  updateDailyView(currentDayIndex);
  
  // Update the dashboard
  updateDashboard();
  
  return true;
}

/**
 * Update weekly and monthly word counts based on daily entries
 */
function updateAggregateWordCounts() {
  if (!scheduleData) return;
  
  // Update weekly word counts
  scheduleData.weekly_schedule.forEach(week => {
    const startDate = new Date(week.start_date);
    const endDate = new Date(week.end_date);
    
    week.total_word_count = scheduleData.daily_schedule.reduce((total, day) => {
      const date = new Date(day.date);
      if (date >= startDate && date <= endDate) {
        return total + (day.word_count || 0);
      }
      return total;
    }, 0);
  });
  
  // Update monthly word counts
  scheduleData.monthly_schedule.forEach(month => {
    const startDate = new Date(month.start_date);
    const endDate = new Date(month.end_date);
    
    month.total_word_count = scheduleData.daily_schedule.reduce((total, day) => {
      const date = new Date(day.date);
      if (date >= startDate && date <= endDate) {
        return total + (day.word_count || 0);
      }
      return total;
    }, 0);
  });
}

/**
 * Calculate the completion percentage for a week
 */
function calculateWeekCompletionPercentage(weekData) {
  if (!scheduleData) return 0;
  
  const startDate = new Date(weekData.start_date);
  const endDate = new Date(weekData.end_date);
  
  const daysInWeek = scheduleData.daily_schedule.filter(day => {
    const date = new Date(day.date);
    return date >= startDate && date <= endDate;
  });
  
  if (daysInWeek.length === 0) return 0;
  
  const completedDays = daysInWeek.filter(day => day.completed).length;
  return Math.round((completedDays / daysInWeek.length) * 100);
}

/**
 * Calculate the completion percentage for a month
 */
function calculateMonthCompletionPercentage(monthData) {
  if (!scheduleData) return 0;
  
  const startDate = new Date(monthData.start_date);
  const endDate = new Date(monthData.end_date);
  
  const daysInMonth = scheduleData.daily_schedule.filter(day => {
    const date = new Date(day.date);
    return date >= startDate && date <= endDate;
  });
  
  if (daysInMonth.length === 0) return 0;
  
  const completedDays = daysInMonth.filter(day => day.completed).length;
  return Math.round((completedDays / daysInMonth.length) * 100);
}

/**
 * Save the schedule data back to the server
 * Note: In a real application, this would make an API call to save the data
 * For this demo, we'll use localStorage as a fallback
 */
function saveScheduleData() {
  console.log('Saving schedule data:', scheduleData);
  
  // Save to localStorage as a fallback
  try {
    localStorage.setItem('sci-fi-novel-schedule', JSON.stringify(scheduleData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
  
  // In a real application, you would send this data to the server
  // fetch('/api/save-schedule', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(scheduleData),
  // });
}

/**
 * Format a date as a readable string
 */
function formatDate(date) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Apply Frutiger Aero visual effects to the UI
 */
function applyFrutigerAeroEffects() {
  // Add glossy effect to buttons
  document.querySelectorAll('.glossy-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      addGlossEffect(button);
    });
    
    button.addEventListener('mouseleave', () => {
      removeGlossEffect(button);
    });
    
    button.addEventListener('mousedown', () => {
      button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', () => {
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
  
  // Add hover effects to glass panels
  document.querySelectorAll('.glass-panel').forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      panel.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.7)';
    });
    
    panel.addEventListener('mouseleave', () => {
      panel.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.7)';
    });
  });
  
  // Add water ripple effect to header
  const header = document.querySelector('.header-glass');
  if (header) {
    header.addEventListener('mouseenter', () => {
      header.style.backgroundImage = 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)';
      
      header.addEventListener('mousemove', handleHeaderMouseMove);
    });
    
    header.addEventListener('mouseleave', () => {
      header.style.backgroundImage = '';
      header.removeEventListener('mousemove', handleHeaderMouseMove);
    });
  }
}

/**
 * Handle mouse movement over the header for water ripple effect
 */
function handleHeaderMouseMove(e) {
  const header = e.currentTarget;
  const rect = header.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  header.style.setProperty('--x', `${x}px`);
  header.style.setProperty('--y', `${y}px`);
}

/**
 * Add gloss effect to an element
 */
function addGlossEffect(element) {
  element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.7)';
  element.style.backgroundImage = 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0.1) 100%)';
}

/**
 * Remove gloss effect from an element
 */
function removeGlossEffect(element) {
  element.style.boxShadow = '';
  element.style.backgroundImage = '';
}

/**
 * Animate a progress bar to a target percentage
 */
function animateProgressBar(progressBar, targetPercentage) {
  if (!progressBar) return;
  
  const currentWidth = parseInt(progressBar.style.width) || 0;
  const duration = 500; // ms
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentPercentage = currentWidth + (targetPercentage - currentWidth) * progress;
    
    progressBar.style.width = `${currentPercentage}%`;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Animate a counter to a target value
 */
function animateCounter(element, targetValue) {
  if (!element) return;
  
  const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
  const duration = 500; // ms
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Fade in an element
 */
function fadeInElement(element) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 10);
}

/**
 * Fade text transition
 */
function fadeTextTransition(element, newText) {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = 'translateY(5px)';
  
  setTimeout(() => {
    element.textContent = newText;
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 300);
}

/**
 * Pulse an element for visual feedback
 */
function pulseElement(element) {
  element.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
  element.style.transform = 'scale(1.05)';
  element.style.boxShadow = '0 0 10px rgba(0, 120, 215, 0.5)';
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
    element.style.boxShadow = '';
  }, 200);
}

/**
 * Shake an element for error feedback
 */
function shakeElement(element) {
  element.style.transition = 'transform 0.1s ease';
  element.style.transform = 'translateX(-5px)';
  
  setTimeout(() => {
    element.style.transform = 'translateX(5px)';
    
    setTimeout(() => {
      element.style.transform = 'translateX(-3px)';
      
      setTimeout(() => {
        element.style.transform = 'translateX(3px)';
        
        setTimeout(() => {
          element.style.transform = 'translateX(0)';
        }, 50);
      }, 50);
    }, 50);
  }, 50);
}

/**
 * Slide down animation
 */
function slideDown(element) {
  const height = element.scrollHeight;
  element.style.height = '0';
  element.style.opacity = '0';
  element.style.overflow = 'hidden';
  element.style.transition = 'height 0.3s ease, opacity 0.3s ease';
  
  setTimeout(() => {
    element.style.height = `${height}px`;
    element.style.opacity = '1';
    
    setTimeout(() => {
      element.style.height = '';
      element.style.overflow = '';
    }, 300);
  }, 10);
}

/**
 * Slide up animation
 */
function slideUp(element) {
  const height = element.scrollHeight;
  element.style.height = `${height}px`;
  element.style.overflow = 'hidden';
  element.style.transition = 'height 0.3s ease, opacity 0.3s ease';
  
  setTimeout(() => {
    element.style.height = '0';
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      element.style.height = '';
      element.style.opacity = '';
      element.style.overflow = '';
    }, 300);
  }, 10);
}

/**
 * Show a notification message
 */
function showNotification(message, type = 'info') {
  // Check if notification container exists, create if not
  let notificationContainer = document.querySelector('.notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Style the container
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.top = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.zIndex = '1000';
    notificationContainer.style.display = 'flex';
    notificationContainer.style.flexDirection = 'column';
    notificationContainer.style.alignItems = 'flex-end';
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Style the notification with Frutiger Aero aesthetic
  notification.style.padding = '10px 15px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  notification.style.opacity = '0';
  notification.style.transform = 'translateX(20px)';
  notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  
  // Set color based on type
  switch (type) {
    case 'success':
      notification.style.background = 'linear-gradient(to bottom, rgba(127, 186, 0, 0.9), rgba(105, 165, 0, 0.9))';
      notification.style.color = 'white';
      break;
    case 'error':
      notification.style.background = 'linear-gradient(to bottom, rgba(232, 17, 35, 0.9), rgba(209, 15, 31, 0.9))';
      notification.style.color = 'white';
      break;
    case 'info':
    default:
      notification.style.background = 'linear-gradient(to bottom, rgba(0, 120, 215, 0.9), rgba(0, 90, 158, 0.9))';
      notification.style.color = 'white';
      break;
  }
  
  // Add glass effect
  notification.style.backdropFilter = 'blur(5px)';
  notification.style.border = '1px solid rgba(255, 255, 255, 0.3)';
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}