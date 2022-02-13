const logger = require('../libs/logger');
const util = require('../libs/util');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const { JSDOM } = require('jsdom');

class Site {
  constructor (site) {
    this.ssh = null;
    this.refreshWrapper = {
      Hares: this._hares,
      CHDBits: this._chdbits,
      LemonHD: this._lemonhd,
      HDChina: this._hdchina,
      HDSky: this._hdsky,
      HDHome: this._hdhome,
      PTerClub: this._pterclub,
      Audiences: this._audiences,
      OurBits: this._ourbits
    };
    this.cookie = site.cookie;
    this.site = site.name;
    this.cron = site.cron;
    this.refreshJob = new CronJob('0 */4 * * *', () => this.refreshInfo());
  };

  async _getDocument (url) {
    const html = (await util.requestPromise({
      url: url,
      headers: {
        cookie: this.cookie
      }
    })).body;
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  // 白兔
  async _hares () {
    const info = {};
    const document = await this._getDocument('https://club.hares.top/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    return info;
  };

  // CHDBits
  async _chdbits () {
    const info = {};
    const document = await this._getDocument('https://chdbits.co/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    return info;
  };

  // HDSky
  async _hdsky () {
    const info = {};
    const document = await this._getDocument('https://hdsky.me/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    return info;
  };

  // PTerClub
  async _pterclub () {
    const info = {};
    const document = await this._getDocument('https://pterclub.com/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    return info;
  };

  // HDHome
  async _hdhome () {
    const info = {};
    const document = await this._getDocument('https://hdhome.org/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    info.formatUploaded = util.formatSize(info.uploaded);
    info.formatDownloaded = util.formatSize(info.downloaded);
    return info;
  };

  // Audiences
  async _audiences () {
    const info = {};
    const document = await this._getDocument('https://audiences.me/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    return info;
  };

  // OurBits
  async _ourbits () {
    const info = {};
    const document = await this._getDocument('https://ourbits.club/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelector('font[class=color_uploaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelector('font[class=color_downloaded]').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('img[class=arrowup]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('img[class=arrowdown]').nextSibling.nodeValue.trim();
    info.formatUploaded = util.formatSize(info.uploaded);
    info.formatDownloaded = util.formatSize(info.downloaded);
    return info;
  };

  // LemonHD
  async _lemonhd () {
    const info = {};
    const document = await this._getDocument('https://lemonhd.org/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;
    // 上传
    info.uploaded = document.querySelectorAll('td[class="bottom nowrap"]')[6].innerHTML.trim().replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = document.querySelectorAll('td[class="bottom nowrap"]')[22].innerHTML.trim().replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelectorAll('td[class="bottom nowrap"]')[8].innerHTML.split('<')[0];
    // 下载
    info.leeching = +document.querySelectorAll('td[class="bottom nowrap"]')[24].innerHTML.split('<')[0];
    return info;
  };

  // HDChina
  async _hdchina () {
    const info = {};
    const document = await this._getDocument('https://hdchina.org/');
    // 用户名
    info.username = document.querySelector('a[href^=userdetails] b').innerHTML;

    // 基本信息
    console.log(document.querySelectorAll('div[class="userinfo"] p'));
    const baseInfo = document.querySelectorAll('div[class="userinfo"] p')[2].innerHTML;
    // 上传
    info.uploaded = baseInfo.match(/\d*\.\d* \wB/g)[0].replace(/(\w)B/, '$1iB');
    info.uploaded = util.calSize(...info.uploaded.split(' '));
    // 下载
    info.downloaded = baseInfo.match(/\d*\.\d* \wB/g)[1].replace(/(\w)B/, '$1iB');
    info.downloaded = util.calSize(...info.downloaded.split(' '));
    // 做种
    info.seeding = +document.querySelector('i[class="fas fa-arrow-up"]').nextSibling.nodeValue.trim();
    // 下载
    info.leeching = +document.querySelector('i[class="fas fa-arrow-down"]').nextSibling.nodeValue.trim().replace(')', '');
    return info;
  };

  async refreshInfo () {
    try {
      const info = await this.refreshWrapper[this.site].call(this);
      info.updateTime = moment().unix();
      logger.debug(this.site, '站点数据成功抓取,', '数据如下:\n', info);
      this.info = info;
    } catch (e) {
      logger.error(this.site, '站点数据抓取失败,', '报错如下:\n', e);
    }
  };
};

module.exports = Site;