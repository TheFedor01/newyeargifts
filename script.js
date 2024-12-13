// Настройки
const API_BASE_URL = "https://docs.wetbot.space/api";
const GIFT_ID = "m4mhy49l";

let userToken = null;

// Авторизация через Discord
document.getElementById("authButton").addEventListener("click", async () => {
    try {
        // Здесь добавьте ваш OAuth2-логин
        alert("OAuth2 авторизация недоступна в демо. Замените код на ваш.");
        userToken = "demoToken"; // Тестовый токен, замените на реальный
        checkUser();
    } catch (error) {
        showMessage("Ошибка авторизации: " + error.message, true);
    }
});

// Проверка привязки пользователя к боту
async function checkUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const data = await response.json();

        if (data.isLinked) {
            showMessage("Успешная авторизация! Вы можете открыть подарок.");
            document.getElementById("openGiftButton").disabled = false;
        } else {
            showMessage("Ваш Discord аккаунт не привязан к боту.", true);
        }
    } catch (error) {
        showMessage("Ошибка проверки пользователя: " + error.message, true);
    }
}

// Логика открытия подарка
document.getElementById("openGiftButton").addEventListener("click", async () => {
    try {
        const reward = getReward();
        const response = await fetch(`${API_BASE_URL}/gifts/open`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ giftId: GIFT_ID, reward })
        });

        const data = await response.json();

        if (data.success) {
            showMessage(`Вы получили ${data.reward.type}: ${data.reward.amount}`);
        } else {
            showMessage("Ошибка открытия подарка.", true);
        }
    } catch (error) {
        showMessage("Ошибка открытия подарка: " + error.message, true);
    }
});

// Логика шансов
function getReward() {
    const randomNumber = Math.random() * 100;

    if (randomNumber <= 75) {
        return {
            id: "ls73d02n",
            type: "Редкий",
            amount: Math.floor(Math.random() * 100) + 1
        };
    } else if (randomNumber <= 99.8) {
        return {
            id: "ls6akmg9",
            type: "Эпический",
            amount: Math.floor(Math.random() * 5) + 1
        };
    } else {
        return {
            id: "lrgkhucn",
            type: "Легендарный",
            amount: 1
        };
    }
}

// Отображение сообщений
function showMessage(message, isError = false) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = isError ? "red" : "green";
}
