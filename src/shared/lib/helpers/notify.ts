export const notify = async (
    message: string,
    error: string = "Произошла ошибка",
    options?: NotificationOptions
) => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        const notification = new Notification(message, options);

        notification.addEventListener("error", () => {
            alert(error);
        });
    }

    if (permission === "denied") {
        alert(message);
    }
};
