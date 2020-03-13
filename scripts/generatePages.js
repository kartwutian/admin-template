/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
(async () => {
  const path = require('path');
  const fs = require('fs');
  const ejs = require('ejs');
  const generateFile = require('./generateFile.js');

  const { pages } = require('../src/pages.js');

  const paths = pages.map(item => item.path);

  const templatePage = fs.readFileSync(
    path.resolve(__dirname, './template/template.page.ejs')
  );
  const templateLess = fs.readFileSync(
    path.resolve(__dirname, './template/template.less.ejs')
  );
  const templateModel = fs.readFileSync(
    path.resolve(__dirname, './template/template.models.ejs')
  );
  const templateService = fs.readFileSync(
    path.resolve(__dirname, './template/template.services.ejs')
  );
  const templateStore = fs.readFileSync(
    path.resolve(__dirname, './template/template.store.index.ejs')
  );
  // const templateLessEntry = fs.readFileSync(
  //   path.resolve(__dirname, './template/template.less.entry.ejs')
  // );

  // 存储所有model信息，用于生产store.js
  const models = [];

  const api = require('./fetch/api.json');

  const pagesPath = path.resolve(__dirname, '../src/pages');
  const utilsPath = path.resolve(__dirname, '../src/utils');
  const storePath = path.resolve(__dirname, '../src/store');
  const sourceCodePath = path.resolve(__dirname, '../src');

  const generatePages = async route => {
    // 做一些初始路由处理
    if (route.startsWith('/')) {
      route = route.slice(1);
    }

    const fullPath = path.resolve(sourceCodePath, route);
    const extname = path.extname(fullPath);
    let basePath = fullPath;
    if (extname) {
      basePath = fullPath.replace(extname, '');
    }
    const filename = path.win32.basename(basePath);
    const dirname = path.dirname(basePath);
    console.log(basePath);
    // 注入page的参数, 过滤掉最后的index
    const modelName = `${path
      .relative(pagesPath, filename === 'index' ? dirname : basePath)
      .split('\\')
      .map(str => str[0].toUpperCase() + str.substr(1))
      .join('')}`;
    console.log(modelName);

    const serviceName = path.win32.basename(dirname);

    // path.relative(sourceCodePath, basePath);

    // 生成页面文件
    await generateFile({
      filePath: `${basePath}.js`,
      template: ejs.render(templatePage.toString(), {
        modelName,
        stylePath: `./${filename}.less`
      })
    });
    // 生成less文件
    await generateFile({
      filePath: `${basePath}.less`,
      template: ejs.render(templateLess.toString())
    });
    // 生成model文件
    await generateFile({
      filePath: `${basePath}.model.js`,
      template: ejs.render(templateModel.toString(), {
        modelName,
        servicePath: `./_service.${serviceName}.js`
      })
    });
    // 生成services文件
    await generateFile({
      filePath: path.resolve(dirname, `_service.${serviceName}.js`),
      template: ejs.render(templateService.toString(), {
        name: modelName,
        list: api[modelName] || [],
        utilsPath: `${path
          .relative(basePath, utilsPath)
          .split('\\')
          .join('/')}`
      })
    });

    models.push({
      name: modelName,
      path: `${path
        .relative(storePath, `${basePath}.model`)
        .split('\\')
        .join('/')}`
    });
  };

  // 注意forEach不支持async await
  for (let i = 0; i < paths.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await generatePages(paths[i]);
  }

  await generateFile(
    {
      filePath: path.resolve(storePath, 'index.js'),
      template: ejs.render(templateStore.toString(), {
        models
      })
    },
    true
  );

  console.log('ok！');
})();
