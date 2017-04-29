const expect = require('chai').expect;
const manifestList = require('../../flat/manifest-list');
const testManifest = require('../../flat/esp8266/esp12/espruino/manifest.1.85.json');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Manifest = require('../../models').Manifest;

xdescribe('Model', () => {
  describe('Manifest model', () => {
    beforeEach((done) => {Manifest.remove({}).then(() => done())});
    after(done => {Manifest.db.dropDatabase().then(() => done())});

    it('must save a manifest', done => {
      const manifest = new Manifest(testManifest);
      manifest.save()
      .then(manifest => {
        expect(manifest).to.have.property('name', 'Espruino');
        expect(manifest).to.have.property('version', '1v85');
        expect(manifest).to.have.property('board', 'ESP8266');
        expect(manifest).to.have.property('revision', 'ESP-12');
        expect(manifest).to.have.property('description', 'Official Binaries for the Espruino Runtime for the ESP8266 MCU ESP-12');
        expect(manifest).to.have.property('download', 'http://www.espruino.com/files/espruino_1v85.zip');
        expect(manifest).to.have.property('flash').that.is.an('array');
        done();
      })
      .catch(err => done(err));
    });

    it('must retrieve a manifest', done => {
      const manifest = new Manifest(testManifest);
      manifest.save()
        .then(manifest => Manifest.find({board: 'ESP8266', revision: 'ESP-12'}).exec())
        .then(manifests => {
          expect(manifests.length).to.eql(1);
          const manifest = manifests[0];
          expect(manifest).to.have.property('name', 'Espruino');
          expect(manifest).to.have.property('version', '1v85');
          expect(manifest).to.have.property('board', 'ESP8266');
          expect(manifest).to.have.property('revision', 'ESP-12');
          expect(manifest).to.have.property('description', 'Official Binaries for the Espruino Runtime for the ESP8266 MCU ESP-12');
          expect(manifest).to.have.property('download', 'http://www.espruino.com/files/espruino_1v85.zip');
          expect(manifest).to.have.property('flash').that.is.an('array');        
          done();
        })
        .catch(err => done(err))
    })
  })
});