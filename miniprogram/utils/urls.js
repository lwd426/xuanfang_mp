const HOST = 'https://www.xuanfang.club'
// const HOST = 'http://localhost:3000'
module.exports = {
  get_authorization_code: `${HOST}/api/authorization_code`,
  consumer_create: `${HOST}/api/consumer/create`,
  get_wine_list: `${HOST}/api/wine/list`,
  get_wine: `${HOST}/api/wine`,
  buy_wine: `${HOST}/api/wine/buy`,
  get_celler: `${HOST}/api/celler/get`,
  get_user_info: `${HOST}/api/consumer/get`,
  wine_gift: `${HOST}/api/wine/gift`,
  wine_recycle: `${HOST}/api/wine/recycle`,
}