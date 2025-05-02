from flask import Flask, render_template, request, jsonify
import yt_dlp

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/preview', methods=['POST'])
def preview():
    data = request.get_json()
    video_url = data.get('url', '')

    try:
        ydl_opts = {
            'quiet': True,
            'skip_download': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            return jsonify({
                'title': info.get('title'),
                'channel': info.get('channel'),
                'thumbnail': info.get('thumbnail'),
                'duration': info.get('duration'),
                'url': video_url
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)