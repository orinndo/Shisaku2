/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    // ページ内のオーディオ要素と再生ボタンを取得
    const audio = document.getElementById('guideAudio');
    const playBtn = document.getElementById('playBtn');
    const btnText = document.getElementById('btnText');

    // 要素が存在する場合のみ処理を実行
    if (audio && playBtn) {
        
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                // 一時停止中なら再生
                audio.play()
                    .then(() => {
                        updateUI(true);
                    })
                    .catch(error => {
                        console.error("Audio play failed:", error);
                        alert("音声の再生に失敗しました。ブラウザの設定を確認してください。");
                    });
            } else {
                // 再生中なら一時停止
                audio.pause();
                updateUI(false);
            }
        });

        // 音声が最後まで再生し終わった時のイベント
        audio.addEventListener('ended', () => {
            updateUI(false);
            btnText.textContent = 'PLAY AGAIN (もう一度再生)';
            audio.currentTime = 0; // 再生位置を先頭に戻す
        });

        /**
         * 再生状態に合わせてボタンの見た目を更新する関数
         * @param {boolean} isPlaying - 再生中かどうか
         */
        function updateUI(isPlaying) {
            if (isPlaying) {
                playBtn.style.backgroundColor = '#d32f2f'; // 停止中は警告色（赤）に変更
                btnText.textContent = 'PAUSE (一時停止)';
            } else {
                playBtn.style.backgroundColor = '#0056b3'; // 通常時はメインカラー（青）
                btnText.textContent = 'PLAY GUIDE (再生)';
            }
        }
    }
});
