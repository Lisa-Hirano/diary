"use strict";

const user_name = document.getElementById("user_name");
const title = document.getElementById("title")
const weather = document.getElementsByName("weather")
const done = document.getElementById("done")
const feeling = document.getElementById("feeling")
const generate_button = document.getElementById("generate");
const preview_area = document.getElementById("preview_area");
const tweet_area = document.getElementById("tweet_area");

/**
 * 文字列を渡すと日記のプレビューを返す関数
 * @param {string} title タイトル
 * @param {string} weather 天気
 * @param {string} done 今日したこと
 * @param {string} feeling 気分
 * @return {string} プレビュー
 */

function diary(title, weather, done, feeling) {
  const preview = "「" + title + "」\n" + "天気は" + weather + "。今日は" + done + "をしました。今の気分は" + feeling + "です。\n"
  return preview;
}

/**
* 指定した要素の子どもを全て削除する
* @param {HTMLElement} element HTMLの要素
*/

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

generate_button.onclick = () => {
  if (user_name.value.length === 0 || title.value.length === 0 || done.value.length === 0 || feeling.value.length === 0) {
    return;
  }
  let weather_checked = "";
  for (let i = 0; i < weather.length; i++) {
    if (weather[i].checked) {
      weather_checked = weather[i].value;
    }
  }

  //プレビューエリア
  removeAllChildren(preview_area);
  const header = document.createElement("h3");
  header.innerText = "プレビュー";
  preview_area.appendChild(header);

  const paragraph = document.createElement("p");
  const preview = diary(title.value, weather_checked, done.value, feeling.value);
  paragraph.innerText = preview;
  preview_area.appendChild(paragraph);


  //ツイートエリア
  removeAllChildren(tweet_area);
  const script = document.createElement('script');
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  tweet_area.appendChild(script);
  const anchor = document.createElement("a");
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent(user_name.value + "の日記") + "&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href", hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute("data-text", preview);
  anchor.innerText = "Tweet #" + user_name.value + "の日記";

  tweet_area.appendChild(anchor);
};
