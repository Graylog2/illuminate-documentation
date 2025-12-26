(function () {
		console.log("🔧 Heading enhancement script loaded");

		let retryCount = 0;
		const maxRetries = 60;

		function enhanceHeadingsWhenReady() {
			const headings = document.querySelectorAll("h2, h3, h4");

			if (!headings.length) {
				if (retryCount < maxRetries) {
					retryCount++;
					setTimeout(enhanceHeadingsWhenReady, 50);
				} else {
					console.warn("⏱️ Heading enhancer: Timed out waiting for headings.");
				}
				return;
			}

			console.log("👉Found " + headings.length + " headings to enhance");

			headings.forEach((heading) => {
				// 🚫 Skip already processed headings
				if (heading.classList.contains("bookmark-processed")) return;

			// 🚫 Skip headings inside search results
			if (heading.closest("#resultList")) return;

			const text = heading.textContent.trim();
			const id =
				heading.id ||
				text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
			heading.id = id;

			const anchor = document.createElement("a");
			anchor.href = "#" + id; // (template literal removed)
			anchor.className = "heading-link";
			anchor.textContent = text;

			const button = document.createElement("button");
			button.className = "copy-link-btn";
			button.setAttribute("aria-label", "Copy link to heading");
			button.title = "Copy link to heading";
			button.innerHTML = "🔗";
			button.onclick = (e) => {
			e.stopPropagation();
			const url =
				window.location.origin + window.location.pathname + "#" + id; // (template literal removed)
			navigator.clipboard.writeText(url).then(() => {
				console.log("✅Copied: " + url);

			// Create and style tooltip feedback
			const tooltip = document.createElement("div");
			tooltip.textContent = "Link copied!";
			tooltip.className = "copy-tooltip";

			// Append inside the button for positioning
			button.appendChild(tooltip);

			// Remove after fade
			setTimeout(() => {
				tooltip.remove();
			}, 2000);
			});
			};

		heading.textContent = "";
		heading.appendChild(anchor);
		heading.appendChild(button);
		heading.classList.add("bookmark-processed");
	});
}

setTimeout(enhanceHeadingsWhenReady, 50);
})();
