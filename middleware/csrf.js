import cookieParser from 'cookie-parser';

export default function (req, res, next) {
  req.cookies = cookieParser.JSONCookies(req.cookies);
  req.csrfToken = req.cookies['XSRF-TOKEN'];
  next();
}
