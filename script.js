// 명언 목록
const quotes = [
  { text: "배움에는 왕도가 없다.", author: "유클리드" },
  { text: "천 리 길도 한 걸음부터.", author: "속담" },
  { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
  { text: "시작이 반이다.", author: "아리스토텔레스" },
  { text: "실패는 성공의 어머니이다.", author: "속담" },
  { text: "아는 것이 힘이다.", author: "프랜시스 베이컨" },
  { text: "행동은 모든 성공의 기본 열쇠다.", author: "파블로 피카소" },
  { text: "늦었다고 생각할 때가 가장 빠를 때다.", author: "속담" }
];

let lastQuoteIndex = -1;

function displayRandomQuote() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && index === lastQuoteIndex);
  lastQuoteIndex = index;

  document.getElementById("quote-text").textContent = `"${quotes[index].text}"`;
  document.getElementById("quote-author").textContent = `- ${quotes[index].author}`;
}

// 날씨 코드 → 아이콘·설명 (Open-Meteo WMO 코드 기준)
function describeWeather(code) {
  if (code === 0) return { icon: "☀️", label: "맑음" };
  if (code <= 2) return { icon: "🌤️", label: "구름 조금" };
  if (code === 3) return { icon: "☁️", label: "흐림" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "안개" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", label: "이슬비" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", label: "비" };
  if (code >= 71 && code <= 77) return { icon: "❄️", label: "눈" };
  if (code >= 80 && code <= 82) return { icon: "🌧️", label: "소나기" };
  if (code >= 85 && code <= 86) return { icon: "🌨️", label: "눈 소나기" };
  if (code >= 95) return { icon: "⛈️", label: "뇌우" };
  return { icon: "🌡️", label: "정보 없음" };
}

// Open-Meteo OpenAPI로 현재 날씨 가져오기 (API Key 불필요)
async function fetchWeather(lat, lon, elementId, cityName) {
  const el = document.getElementById(elementId);
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
    );
    if (!response.ok) throw new Error("날씨 정보를 가져오는데 실패했습니다.");
    const data = await response.json();
    const temp = Math.round(data.current_weather.temperature);
    const w = describeWeather(data.current_weather.weathercode);
    el.textContent = `${cityName} ${w.icon} ${temp}°C ${w.label}`;
  } catch (error) {
    el.textContent = `${cityName} 날씨 정보 없음`;
    console.error(error);
  }
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  displayRandomQuote();
  fetchWeather(37.5665, 126.978, "weather-seoul", "서울");
  fetchWeather(33.4996, 126.5312, "weather-jeju", "제주");

  document.getElementById("quote-next").addEventListener("click", displayRandomQuote);

  // I'm Feeling Lucky 버튼
  document.getElementById("lucky-btn").addEventListener("click", () => {
    window.location.href = "https://www.google.com/doodles";
  });
});
