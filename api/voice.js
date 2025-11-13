export default async function handler(req, res) {
  const { prompt, voice } = req.query;

  if (!prompt || !voice) {
    return res.status(400).json({
      developer: "MONTE 🏦",
      status: "خطأ ❌",
      message: "النص والصوت مطلوبان! 📌 الرجاء كتابة prompt و voice",
      usage: "مثال: /api/anime/voice?prompt=مرحبا&voice=غوجو"
    });
  }

  try {
    // استدعاء API خارجي حاليًا
    const response = await fetch(
      `https://api-tyson-md.vercel.app/api/anime/voice?prompt=${encodeURIComponent(
        prompt
      )}&voice=${encodeURIComponent(voice)}`
    );

    const data = await response.json();

    if (!data.url)
      return res.json({ status: "فشل ❌", message: "تعذر توليد الصوت." });

    res.json({
      status: "نجاح ✅",
      voice,
      text: prompt,
      url: data.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "خطأ ❌",
      message: "حدث خطأ أثناء معالجة الطلب."
    });
  }
}
