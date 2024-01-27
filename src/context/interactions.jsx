fetch("https://discord.com/api/v9/interactions", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,zh-CN;q=0.6,zh;q=0.5,ja-JP;q=0.4,ja;q=0.3,ko-KR;q=0.2,ko;q=0.1",
    "authorization": process.env.REACT_APP_DISCORD_AUTH,
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqjr0R0OwVjKkVdY7",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-debug-options": "bugReporterEnabled",
    "x-discord-locale": "en-US",
    "x-discord-timezone": "America/New_York",
    "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTIwLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjI2MTcyNiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
  },
  "referrer": process.env.REACT_APP_DISCORD_CHANNEL,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "------WebKitFormBoundaryqjr0R0OwVjKkVdY7\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"526564851057950720\",\"channel_id\":\"1200662115065790495\",\"session_id\":\"8cff868ab98f460755408e1bc08daa27\",\"data\":{\"version\":\"1166847114609958943\",\"id\":\"1000850743479255081\",\"name\":\"settings\",\"type\":1,\"options\":[],\"application_command\":{\"id\":\"1000850743479255081\",\"type\":1,\"application_id\":\"936929561302675456\",\"version\":\"1166847114609958943\",\"name\":\"settings\",\"description\":\"View and adjust your personal settings.\",\"integration_types\":[0],\"global_popularity_rank\":5,\"options\":[],\"description_localized\":\"View and adjust your personal settings.\",\"name_localized\":\"settings\"},\"attachments\":[]},\"nonce\":\"1200663583814320128\",\"analytics_location\":\"slash_ui\"}\r\n------WebKitFormBoundaryqjr0R0OwVjKkVdY7--\r\n",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});