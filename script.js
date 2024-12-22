// Feed container and default content
const feedContainer = document.getElementById("feedContainer");
const menuContainer = document.getElementById("menuContainer");

const defaultContent = '<p>Select a channel from the menu to display its feed here.</p>';

// Channels data
const channels = [
  {
    section: "Social Media",
    items: [
      { id: "youtube", name: "YouTube", icon: "fab fa-youtube", feed: '<iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>' },
      { id: "twitter", name: "Twitter", icon: "fab fa-twitter", feed: `
        <blockquote class="twitter-tweet">
          <p lang="en" dir="ltr">This is an example tweet.</p>
          &mdash; TwitterDev (@TwitterDev)
          <a href="https://twitter.com/TwitterDev/status/560070183650213889"></a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>` },
      { id: "instagram", name: "Instagram", icon: "fab fa-instagram", feed: '<p>Instagram integration requires APIs. Placeholder content is shown here.</p>' },
      { id: "facebook", name: "Facebook", icon: "fab fa-facebook", feed: '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMeta&tabs=timeline&width=340&height=500" width="100%" height="500" style="border:none;overflow:hidden;" scrolling="no" frameborder="0"></iframe>' },
      { id: "tiktok", name: "TikTok", icon: "fab fa-tiktok", feed: '<p>TikTok integration placeholder content is shown here.</p>' }
    ]
  },
  {
    section: "Financial Channels",
    items: [
      { id: "cnbc", name: "CNBC", icon: "fas fa-chart-line", feed: '<iframe src="https://www.cnbc.com/live-tv/" width="100%" height="500" frameborder="0" allowfullscreen></iframe>' },
      { id: "bloomberg", name: "Bloomberg", icon: "fas fa-briefcase", feed: '<iframe src="https://www.bloomberg.com/live" width="100%" height="500" frameborder="0" allowfullscreen></iframe>' },
      { id: "yahooFinance", name: "Yahoo Finance", icon: "fas fa-dollar-sign", feed: '<iframe src="https://finance.yahoo.com" width="100%" height="500" frameborder="0" allowfullscreen></iframe>' }
    ]
  }
];

// Generate menu dynamically
const generateMenu = () => {
  channels.forEach((section) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("menu-section");

    const sectionTitle = document.createElement("h4");
    sectionTitle.textContent = section.section;
    sectionDiv.appendChild(sectionTitle);

    section.items.forEach((item) => {
      const menuItem = document.createElement("a");
      menuItem.classList.add("menu-item");
      menuItem.href = "#";
      menuItem.id = `${item.id}MenuItem`;
      menuItem.innerHTML = `<i class="${item.icon}"></i> ${item.name}`;
      menuItem.addEventListener("click", () => {
        loadFeed(item.id);
        saveLastSelected(item.id); // Save the selected channel to local storage
      });
      sectionDiv.appendChild(menuItem);
    });

    menuContainer.appendChild(sectionDiv);
  });
};

// Load feed into the main content area
const loadFeed = (id) => {
  const channel = channels.flatMap((section) => section.items).find((item) => item.id === id);
  if (channel) {
    feedContainer.innerHTML = channel.feed;

    // Reload Twitter Widgets if Twitter is selected
    if (id === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }
  }
};

// Save the last selected channel to local storage
const saveLastSelected = (id) => {
  localStorage.setItem("lastSelectedChannel", id);
};

// Load the last selected channel from local storage
const loadLastSelected = () => {
  const lastSelected = localStorage.getItem("lastSelectedChannel");
  if (lastSelected) {
    loadFeed(lastSelected);
  } else {
    feedContainer.innerHTML = defaultContent; // Show default content if no selection exists
  }
};

// Reset content to default on Escape key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    feedContainer.innerHTML = defaultContent;
    localStorage.removeItem("lastSelectedChannel"); // Clear saved selection
  }
});

// Next button action
document.getElementById("nextBtn").addEventListener("click", () => {
  alert("Proceeding to the next step...");
});

// Initialize the menu and load the last selected channel
generateMenu();
loadLastSelected();