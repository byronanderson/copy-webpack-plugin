import path from 'path';

import { runEmit } from './helpers/run';

const BUILD_DIR = path.join(__dirname, 'build');
const TEMP_DIR = path.join(__dirname, 'tempdir');
const FIXTURES_DIR = path.join(__dirname, 'fixtures');

describe('to option', () => {
  describe('is a file', () => {
    it('should move a file to a new file', (done) => {
      runEmit({
        expectedAssetKeys: ['newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: 'newfile.txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new file when "to" is absolute path', (done) => {
      runEmit({
        expectedAssetKeys: ['../tempdir/newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: path.join(TEMP_DIR, 'newfile.txt'),
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new file inside nested directory', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: 'newdirectory/newfile.txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new file inside nested directory when "to" an absolute path', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: path.join(BUILD_DIR, 'newdirectory/newfile.txt'),
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new file inside other directory what out of context', (done) => {
      runEmit({
        expectedAssetKeys: ['../tempdir/newdirectory/newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: path.join(TEMP_DIR, 'newdirectory/newfile.txt'),
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file using invalid template syntax', (done) => {
      runEmit({
        expectedAssetKeys: ['directory/[md5::base64:20].txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: 'directory/[md5::base64:20].txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });
  });

  describe('is a directory', () => {
    it('should move a file to a new directory', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory out of context', (done) => {
      runEmit({
        expectedAssetKeys: ['../tempdir/file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: TEMP_DIR,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory with a forward slash', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: 'newdirectory/',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory with an extension and path separator at end', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory.ext/file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: `newdirectory.ext${path.sep}`,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory when "to" is absolute path', (done) => {
      runEmit({
        expectedAssetKeys: ['file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: BUILD_DIR,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory when "to" is absolute path with a forward slash', (done) => {
      runEmit({
        expectedAssetKeys: ['file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: `${BUILD_DIR}/`,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory from nested directory', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/directoryfile.txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory from nested directory when "from" is absolute path', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/directoryfile.txt'],
        patterns: [
          {
            from: path.join(FIXTURES_DIR, 'directory', 'directoryfile.txt'),
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory from nested directory when "from" is absolute path with a forward slash', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/directoryfile.txt'],
        patterns: [
          {
            from: path.join(FIXTURES_DIR, 'directory', 'directoryfile.txt'),
            to: 'newdirectory/',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new directory', (done) => {
      runEmit({
        expectedAssetKeys: [
          'newdirectory/.dottedfile',
          'newdirectory/directoryfile.txt',
          'newdirectory/nested/deep-nested/deepnested.txt',
          'newdirectory/nested/nestedfile.txt',
        ],
        patterns: [
          {
            from: 'directory',
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new nested directory', (done) => {
      runEmit({
        expectedAssetKeys: [
          'newdirectory/deep-nested/deepnested.txt',
          'newdirectory/nestedfile.txt',
        ],
        patterns: [
          {
            from: path.join(FIXTURES_DIR, 'directory', 'nested'),
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new directory out of context', (done) => {
      runEmit({
        expectedAssetKeys: [
          '../tempdir/.dottedfile',
          '../tempdir/directoryfile.txt',
          '../tempdir/nested/deep-nested/deepnested.txt',
          '../tempdir/nested/nestedfile.txt',
        ],
        patterns: [
          {
            from: 'directory',
            to: TEMP_DIR,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new directory when "to" is absolute path', (done) => {
      runEmit({
        expectedAssetKeys: [
          '.dottedfile',
          'directoryfile.txt',
          'nested/deep-nested/deepnested.txt',
          'nested/nestedfile.txt',
        ],
        patterns: [
          {
            from: 'directory',
            to: BUILD_DIR,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new directory when "to" is absolute path with a forward slash', (done) => {
      runEmit({
        expectedAssetKeys: [
          '.dottedfile',
          'directoryfile.txt',
          'nested/deep-nested/deepnested.txt',
          'nested/nestedfile.txt',
        ],
        patterns: [
          {
            from: 'directory',
            to: `${BUILD_DIR}/`,
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files to a new directory from nested directory', (done) => {
      runEmit({
        expectedAssetKeys: [
          'newdirectory/deep-nested/deepnested.txt',
          'newdirectory/nestedfile.txt',
        ],
        patterns: [
          {
            from: 'directory/nested',
            to: 'newdirectory',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to a new directory when "to" is empty', (done) => {
      runEmit({
        expectedAssetKeys: ['file.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: '',
          },
        ],
      })
        .then(done)
        .catch(done);
    });
  });

  describe('is a template', () => {
    it('should move a file using "contenthash"', (done) => {
      runEmit({
        expectedAssetKeys: ['directory/5d7817.txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: 'directory/[contenthash:6].txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file using custom `contenthash` digest', (done) => {
      runEmit({
        expectedAssetKeys: ['directory/c2a6.txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: 'directory/[sha1:contenthash:hex:4].txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file using "name" and "ext"', (done) => {
      runEmit({
        expectedAssetKeys: ['binextension.bin'],
        patterns: [
          {
            from: 'binextension.bin',
            to: '[name].[ext]',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file using "name", "contenthash" and "ext"', (done) => {
      runEmit({
        expectedAssetKeys: ['file-5d7817.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: '[name]-[contenthash:6].[ext]',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file from nested directory', (done) => {
      runEmit({
        expectedAssetKeys: ['directoryfile-5d7817.txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: '[name]-[hash:6].[ext]',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file from nested directory to new directory', (done) => {
      runEmit({
        expectedAssetKeys: ['newdirectory/directoryfile-5d7817.txt'],
        patterns: [
          {
            from: 'directory/directoryfile.txt',
            to: 'newdirectory/[name]-[hash:6].[ext]',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file without an extension using "name", "ext"', (done) => {
      runEmit({
        expectedAssetKeys: ['noextension.31d6cf.newext'],
        patterns: [
          {
            from: 'noextension',
            to: '[name][ext].[contenthash:6].newext',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move files using "path", "name", "contenthash" and "ext"', (done) => {
      runEmit({
        expectedAssetKeys: [
          'newdirectory/.dottedfile-5e294e',
          'newdirectory/directoryfile-5d7817.txt',
          'newdirectory/nested/deep-nested/deepnested-31d6cf.txt',
          'newdirectory/nested/nestedfile-31d6cf.txt',
        ],
        patterns: [
          {
            from: 'directory',
            to: 'newdirectory/[path][name]-[contenthash:6].[ext]',
          },
        ],
      })
        .then(done)
        .catch(done);
    });

    it('should move a file to "compiler.options.output" by default', (done) => {
      runEmit({
        compilation: { output: { path: '/path/to' } },
        expectedAssetKeys: ['newfile.txt'],
        patterns: [
          {
            from: 'file.txt',
            to: 'newfile.txt',
          },
        ],
      })
        .then(done)
        .catch(done);
    });
  });
});
