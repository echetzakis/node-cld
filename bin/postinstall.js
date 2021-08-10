const path = require('path');
const fs   = require('fs');
const glob = require('glob');
const _    = require('underscore');
const rimraf = require('rimraf');

deleteDepSources(function(err) {
  deleteBuildFiles(function(err) {
  });
});

function deleteDepSources(cb) {
  const buildPath = path.resolve(__dirname, '..', 'build');
  const keepDeps = fs.existsSync(buildPath);
  if(keepDeps){
      return cb(null);
  }
  const depsPath = path.resolve(__dirname, '..', 'deps');
  rimraf(depsPath, cb);
}

function deleteBuildFiles(cb) {
  const pattern = path.resolve(__dirname, '..', 'build', '**', '*');
  glob(pattern, {nodir:true}, function(err, files) {
    if (err) {
      return cb(err);
    }

    files = _.reject(files, function(val, key) {
      return /cld\.(node|pdb)$/.test(val)
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fs.unlinkSync(file);
    }

    cb(null);
  });
}
