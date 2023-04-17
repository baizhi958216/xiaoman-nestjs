import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    let urls: string[] = [];
    const getCosPlay = async () => {
      const browser = await puppeteer.launch({});
      const page = await browser.newPage();
      await page.goto('https://www.miyoushe.com/ys/article/38106965');
      await page.waitForNavigation();
      await page.waitForSelector('.mhy-img-article');
      const imgElements = await page.$$('.mhy-img-article img');
      for (let i = 0; i < imgElements.length; i++) {
        const imgSrc = await page.evaluate(
          (element) => element.getAttribute('src'),
          imgElements[i],
        );
        urls.push(imgSrc);
      }
      await browser.close();
    };
    await getCosPlay();
    this.writeFile(urls);
    return `cos`;
  }

  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url.split('?')[0], { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = createWriteStream(
        join(__dirname, '../cos' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
