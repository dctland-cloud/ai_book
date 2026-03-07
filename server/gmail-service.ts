/**
 * Gmail 자동 연동 서비스 (2단계 구현용)
 *
 * 이 파일은 Gmail에서 퍼플렉시티 뉴스 이메일을 자동으로 가져오는 기능의 기초입니다.
 * 완전 자동화를 위해서는 다음 설정이 필요합니다:
 *
 * === 설정 방법 ===
 *
 * 1. Google Cloud Console (https://console.cloud.google.com) 에서:
 *    - 새 프로젝트 생성
 *    - Gmail API 활성화
 *    - OAuth 2.0 클라이언트 ID 생성 (데스크톱 앱)
 *    - client_id, client_secret 발급
 *
 * 2. 환경변수 설정 (.env 파일):
 *    GMAIL_CLIENT_ID=your_client_id
 *    GMAIL_CLIENT_SECRET=your_client_secret
 *    GMAIL_REFRESH_TOKEN=your_refresh_token
 *
 * 3. 필요한 패키지 설치:
 *    npm install googleapis
 *
 * 4. 스케줄링 설정:
 *    npm install node-cron
 *    - 매일 아침 7시에 자동 실행되도록 설정
 *
 * === 동작 흐름 ===
 *
 * 1. Gmail API로 "from:perplexity" 이메일 검색
 * 2. 최신 이메일의 본문 텍스트 추출
 * 3. news-parser.ts의 parseNewsText()로 구조화
 * 4. 인포그래픽 HTML 생성 및 이미지 캡처
 * 5. (선택) SNS 자동 포스팅 또는 알림 발송
 */

export interface GmailConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export interface FetchedEmail {
  subject: string;
  body: string;
  receivedAt: string;
}

/**
 * Gmail에서 퍼플렉시티 이메일을 가져오는 함수 (스텁)
 * googleapis 패키지 설치 후 구현 예정
 */
export async function fetchPerplexityEmail(
  _config: GmailConfig,
): Promise<FetchedEmail | null> {
  // TODO: googleapis 설치 후 아래 로직 구현
  //
  // const { google } = require('googleapis');
  // const oauth2Client = new google.auth.OAuth2(config.clientId, config.clientSecret);
  // oauth2Client.setCredentials({ refresh_token: config.refreshToken });
  //
  // const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  // const res = await gmail.users.messages.list({
  //   userId: 'me',
  //   q: 'from:perplexity subject:뉴스 newer_than:1d',
  //   maxResults: 1,
  // });
  //
  // if (!res.data.messages?.length) return null;
  //
  // const msg = await gmail.users.messages.get({
  //   userId: 'me',
  //   id: res.data.messages[0].id,
  //   format: 'full',
  // });
  //
  // return {
  //   subject: getHeader(msg.data.payload.headers, 'Subject'),
  //   body: decodeBody(msg.data.payload),
  //   receivedAt: new Date(parseInt(msg.data.internalDate)).toISOString(),
  // };

  console.log(
    "[Gmail Service] 아직 설정되지 않았습니다. 위의 설정 방법을 참고하세요.",
  );
  return null;
}

/**
 * 스케줄러 설정 함수 (스텁)
 * node-cron 패키지 설치 후 구현 예정
 */
export function setupScheduler(_cronExpression: string = "0 7 * * *") {
  // TODO: node-cron 설치 후 아래 로직 구현
  //
  // const cron = require('node-cron');
  // cron.schedule(cronExpression, async () => {
  //   console.log('[Scheduler] 뉴스 인포그래픽 자동 생성 시작...');
  //   const config: GmailConfig = {
  //     clientId: process.env.GMAIL_CLIENT_ID!,
  //     clientSecret: process.env.GMAIL_CLIENT_SECRET!,
  //     refreshToken: process.env.GMAIL_REFRESH_TOKEN!,
  //   };
  //   const email = await fetchPerplexityEmail(config);
  //   if (email) {
  //     const parsed = parseNewsText(email.body);
  //     // 인포그래픽 생성 및 저장
  //     console.log(`[Scheduler] ${parsed.items.length}개 뉴스 파싱 완료`);
  //   }
  // });

  console.log(
    "[Scheduler] 스케줄러가 아직 설정되지 않았습니다. node-cron 설치 후 활성화하세요.",
  );
}
