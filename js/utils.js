/**
 * Update the message for an element.
 * 
 * @param { HTMLElement } element - Element to use.
 * @param { String } message - Message to give.
 * @param { String } type - Type of message (warning, error, success).
 * @param { Boolean } excludeIcon - Do not show the icon?
 */
function updateMessage(element, message = "?", type, excludeIcon) {
    if (!excludeIcon) {
        let icon = "";

        switch (type?.toLowerCase()) {
            case "error":
                icon = `<i class="icon error fa fa-circle-exclamation"></i> `;
                break;
            
            case "warn":
            case "warning":
                icon = `<i class="icon warning fa fa-triangle-exclamation"></i> `;
                break;

            case "good":
            case "success":
                icon = `<i class="icon good fa fa-circle-check"></i> `;
                break;

            default:
                icon = `<i class="icon fa fa-circle-info"></i> `;
        }

        message = (icon + message);
    }

    element.innerHTML = message;

    element.className = `messageDisplay infoBox ${type}`;
}

// Allow for this to be called from any html element instance.
HTMLElement.prototype.setMessage = function(message, type, excludeIcon) {
    return updateMessage(this, message, type, excludeIcon);
};