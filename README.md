# Blockly Sample App

## Purpose

This app illustrates how to use Blockly together with common programming tools like node/npm, webpack, typescript, eslint, and others. You can use it as the starting point for your own application and modify it as much as you'd like. It contains basic infrastructure for running, building, testing, etc. that you can use even if you don't understand how to configure the related tool yet. When your needs outgrow the functionality provided here, you can replace the provided configuration or tool with your own.

## Quick Start

1. [Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) npm if you haven't before.
2. Run [`npx @blockly/create-package app <application-name>`](https://www.npmjs.com/package/@blockly/create-package) to clone this application to your own machine.
3. Run `npm install` to install the required dependencies.
4. Run `npm run start` to run the development server and see the app in action.
5. If you make any changes to the source code, just refresh the browser while the server is running to see them.

## Tooling

The application uses many of the same tools that the Blockly team uses to develop Blockly itself. Following is a brief overview, and you can read more about them on our [developer site](https://developers.google.com/blockly/guides/contribute/get-started/development_tools).

- Structure: The application is built as an npm package. You can use npm to manage the dependencies of the application.
- Modules: ES6 modules to handle imports to/exports from other files.
- Building/bundling: Webpack to build the source code and bundle it into one file for serving.
- Development server: webpack-dev-server to run locally while in development.
- Testing: Mocha to run unit tests.
- Linting: Eslint to lint the code and ensure it conforms with a standard style.
- UI Framework: Does not use a framework. For more complex applications, you may wish to integrate a UI framework like React or Angular.

You can disable, reconfigure, or replace any of these tools at any time, but they are preconfigured to get you started developing your Blockly application quickly.

## Structure

- `package.json` contains basic information about the app. This is where the scripts to run, build, etc. are listed.
- `package-lock.json` is used by npm to manage dependencies
- `webpack.config.js` is the configuration for webpack. This handles bundling the application and running our development server.
- `src/` contains the rest of the source code.
- `dist/` contains the packaged output (that you could host on a server, for example). This is ignored by git and will only appear after you run `npm run build` or `npm run start`.

### Source Code

- `index.html` contains the skeleton HTML for the page. This file is modified during the build to import the bundled source code output by webpack.
- `index.js` is the entry point of the app. It configures Blockly and sets up the page to show the blocks, the generated code, and the output of running the code in JavaScript.
- `serialization.js` has code to save and load the workspace using the browser's local storage. This is how your workspace is saved even after refreshing or leaving the page. You could replace this with code that saves the user's data to a cloud database instead.
- `toolbox.js` contains the toolbox definition for the app. The current toolbox contains nearly every block that Blockly provides out of the box. You probably want to replace this definition with your own toolbox that uses your custom blocks and only includes the default blocks that are relevant to your application.
- `blocks/text.js` has code for a custom text block, just as an example of creating your own blocks. You probably want to delete this block, and add your own blocks in this directory.
- `generators/javascript.js` contains the JavaScript generator for the custom text block. You'll need to include block generators for any custom blocks you create, in whatever programming language(s) your application will use.

## Serving

To run your app locally, run `npm run start` to run the development server. This mode generates source maps and ingests the source maps created by Blockly, so that you can debug using unminified code.

To deploy your app so that others can use it, run `npm run build` to run a production build. This will bundle your code and minify it to reduce its size. You can then host the contents of the `dist` directory on a web server of your choosing. If you're just getting started, try using [GitHub Pages](https://pages.github.com/).

```
Blockly_start
├─ .DS_Store
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ production
│  │     ├─ remotes
│  │     │  └─ origin
│  │     │     ├─ main
│  │     │     └─ production
│  │     └─ stash
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ 7f3954c4e81f493c401bda7f3614774788edfb
│  │  ├─ 01
│  │  │  └─ d287a3a941a63fede15953aa15dc0e04d88a7b
│  │  ├─ 02
│  │  │  ├─ 175192d13d97f4a36d7d2caa00368016276647
│  │  │  ├─ a746a90690597c92326c0ad1346c7d55030077
│  │  │  └─ ea93fe0e3f338848118dd7bba5456e8ff8b5dc
│  │  ├─ 03
│  │  │  ├─ 4c8636a1fe94bd4a22975ee5adff16ee882517
│  │  │  ├─ 6accfcaa9b7abf62c362ee627c947bc169f6f3
│  │  │  └─ 8e17927fcce87695d32210528657429eb80cfb
│  │  ├─ 05
│  │  │  └─ bc7fd742521dfc4cb5f758cdab4cecf7c12b21
│  │  ├─ 08
│  │  │  ├─ 8ddb68033d342d3c6a9beef0177b7d692808b2
│  │  │  └─ e59b66b62933deadb08d97d66aa5fbdc576d0f
│  │  ├─ 09
│  │  │  └─ 41b3c542b9e7afa6a82519f7857780b6e099bd
│  │  ├─ 0a
│  │  │  └─ 841127fb7411bb1324cc025fdb2298f7ac8fe0
│  │  ├─ 0e
│  │  │  ├─ 589f32c0a2c1b1e77e1559960ded927b6a4993
│  │  │  └─ 60bea83f7785d5fbe1f9b7a76eb2f606d7ac02
│  │  ├─ 10
│  │  │  └─ 84be49a09cee62683d2989d5c1727da3bb65eb
│  │  ├─ 11
│  │  │  ├─ 38151cac5f02a4067639635426908c5bc92ba4
│  │  │  ├─ 41062bc6f0fdece709e5b4e584f520b83378cc
│  │  │  └─ b315c8a24af7e8447c257639545fba7e466b4d
│  │  ├─ 12
│  │  │  └─ 2bab87303970a7f4c23b9b0c85da887487db5f
│  │  ├─ 14
│  │  │  ├─ a2853dde0ca7a178a7d513635e08d92f0a8d64
│  │  │  └─ da846daad9b8a8a75b5556a4de698dc6f6ed4d
│  │  ├─ 15
│  │  │  └─ d8e537ca612efa40992413b5d49780e0c30cc5
│  │  ├─ 17
│  │  │  └─ 58baff4eadd757337dbb98591e7a859eb295bf
│  │  ├─ 18
│  │  │  ├─ 20e8522f802c33b8aa226ed16926cbb5373441
│  │  │  ├─ 2a1c480cf0dfd65d264710256d9752ca337cc1
│  │  │  └─ c2c24b4ae6149c30c37c43b8f8ba838d83d6f5
│  │  ├─ 1a
│  │  │  └─ 480623c734115ab1c81d6f10dcf832712ca7a1
│  │  ├─ 1b
│  │  │  └─ 3c36d82b839b887376728fc77a861ede62e726
│  │  ├─ 1c
│  │  │  └─ 670cac1437ad1945d0fcddc1d4d2c066c88fc0
│  │  ├─ 1d
│  │  │  └─ 325e502da7fafa8f19d9ff712d71671a2f6593
│  │  ├─ 1e
│  │  │  ├─ 0147780553c247daf1c15072ec212bb087dd43
│  │  │  ├─ 4939067db5ae9315d6629075a86e4e2c57d308
│  │  │  └─ 54f85da1ad3841e142055e0fe18d2850ac71e2
│  │  ├─ 1f
│  │  │  └─ 6201588863e7637a2b2839a33385e062293eb1
│  │  ├─ 20
│  │  │  ├─ 43a21e84916a87817090c7074e3e04236e2fad
│  │  │  ├─ 5951b3a730e2a1a96f25e4b7725456d494085b
│  │  │  └─ d7fb7575de5c38d5c5f6ce343fd2b038c1085e
│  │  ├─ 21
│  │  │  └─ 238cf06bb9ff64cd67f61b6fa06e1095a69a97
│  │  ├─ 22
│  │  │  └─ 42d241765cc821260e88e3be9c066e5d32fd37
│  │  ├─ 23
│  │  │  └─ 41902d635052203ed6cd1c4e0942cbc1e74a01
│  │  ├─ 24
│  │  │  └─ aeead43307c9a32f5dfcfb0c860f7286453937
│  │  ├─ 28
│  │  │  └─ d6e3bad972c6df23f47b07158c540ed6d515d5
│  │  ├─ 2a
│  │  │  └─ 34f99c6cd36ebf7336a1d70cedf5fce2781203
│  │  ├─ 2b
│  │  │  └─ 50f90c80ca65931fe88b2fd35c758350747824
│  │  ├─ 2c
│  │  │  └─ c34cb9fba7b76a6cd823b938b9732d539675fb
│  │  ├─ 31
│  │  │  ├─ 1371d2633354ab8a66412ec55843b918917044
│  │  │  └─ a62ef682ad751a8c2f87dc4d165d9e11ff52c4
│  │  ├─ 32
│  │  │  ├─ 03fb72e2e59abdcc608d04c4b7d21d8cb05f32
│  │  │  └─ fb2b648be028c696fd2c0f4410a67caf108255
│  │  ├─ 33
│  │  │  └─ ffb30f76c8116740c8d5bb517d96ae64128573
│  │  ├─ 36
│  │  │  └─ 392fe20dfe6a16aef70ce540a75181f71b3c19
│  │  ├─ 37
│  │  │  └─ cbaeda572bbcdbbac4bd74f581e6668037c04e
│  │  ├─ 38
│  │  │  └─ 629b0da765d395cbc0e714e3a862c145fa6274
│  │  ├─ 3a
│  │  │  └─ e9b68c37065c30f6e368675ddfed595a4165d2
│  │  ├─ 3c
│  │  │  ├─ 3629e647f5ddf82548912e337bea9826b434af
│  │  │  └─ a47ebc8b1e78dbc696aba4f35e74f8e8c45880
│  │  ├─ 3d
│  │  │  └─ 38a939cb7646815168c36e431df600511adf63
│  │  ├─ 3e
│  │  │  ├─ b6ba77d45b906a3aa09f2c5015472ffecfa12a
│  │  │  └─ fffbd0629564e4d7417bdc2b268ea7ce2dfb16
│  │  ├─ 40
│  │  │  └─ 493499397581a74e38b672517b51c33dc8a071
│  │  ├─ 41
│  │  │  ├─ 4ced73197152319658c7f132475cdf6249eb40
│  │  │  └─ aa619de5a29ee24e4a9b45cd2c88ab9e5b1915
│  │  ├─ 42
│  │  │  ├─ e1c3b83ad6e8ad5ad249b399a9c1dc02f085fd
│  │  │  ├─ efac3117a1fc980906b02039da3e73dd76f833
│  │  │  └─ ffc01542c397d88cd1499263106395ef1038eb
│  │  ├─ 43
│  │  │  ├─ 8db59ab5b075ad1e251306b414222789687609
│  │  │  └─ d755e50b400b7a10d8d548e5183e2995556b8f
│  │  ├─ 45
│  │  │  ├─ 053219d696b5df8c6ce0cb09c31d002447f8de
│  │  │  └─ 20304e255cf7e05edfe435bfa836a2bd81f560
│  │  ├─ 46
│  │  │  └─ 5de8f8f32e6744bac4c5a8629be3acbe9d3c35
│  │  ├─ 48
│  │  │  └─ f8dde9295234959df264bcb6519ff23cb22bc0
│  │  ├─ 49
│  │  │  └─ 4504a079d00744d77fe0ccb6458bab1249128e
│  │  ├─ 4a
│  │  │  └─ 21d29c9e14f97a7ee4954cebbde0b81ae311cb
│  │  ├─ 4b
│  │  │  └─ a4402888dbda2989a1b937b6b564dee33a2338
│  │  ├─ 4c
│  │  │  ├─ 4a328e9a2c85d0efd75f49954463c670d209d3
│  │  │  ├─ 77fc2f8cbe9b9c8d7f60fcfc01f0ab285d6af7
│  │  │  └─ de82ea2424c2abd5892bcaf089f141c23e9c6e
│  │  ├─ 4e
│  │  │  ├─ 363e78a51ee60c42c7819db5ac9c0ac01d6ad9
│  │  │  ├─ c5c8df7c89dbd3eaff080a270300f7d14feed5
│  │  │  └─ fef003aa713730b97a11bc487d71ce465a0e88
│  │  ├─ 4f
│  │  │  ├─ 43d66c1699eb29ade8a43f70610f6a0e58cd63
│  │  │  └─ af30d147cd6a31a5a5c6a0f03a4712864409d4
│  │  ├─ 51
│  │  │  └─ 9529aeb12b2a2638262969379fe2075c5f31ee
│  │  ├─ 52
│  │  │  └─ 4e6b9f941da9d18cb2daee9147aa68b5819a0b
│  │  ├─ 54
│  │  │  └─ d32f59688e9a30340042cde26d13cc5ff8ece1
│  │  ├─ 55
│  │  │  └─ dcce9064ca50fd379db0f0c780d5ec8c5595c4
│  │  ├─ 56
│  │  │  ├─ 1ede65627f49dc67cb65ed90142631734ef3ff
│  │  │  └─ 40617a001eb4c94771bb883b597d0711e287c0
│  │  ├─ 58
│  │  │  └─ 23a492e5a9326b1563600bb22be5258f4bf61d
│  │  ├─ 59
│  │  │  └─ 26846aa2c7ad1bad627b21f0263f5ea5bc056f
│  │  ├─ 5a
│  │  │  └─ 3ec164d870b4b1f6d3778690a4610d705d5fe8
│  │  ├─ 5b
│  │  │  ├─ 523d79d0bb61289111af6e36adebf427cf3346
│  │  │  └─ e72ef8d7596dff0ca11f0ac1470e3c4060c65e
│  │  ├─ 5d
│  │  │  ├─ 2326b4a80b2ce55fe155094d06a3b091e09cc8
│  │  │  ├─ 2b6d2469bb0babed99048038e959671acda089
│  │  │  └─ a0025d158c6323a9d3d61322ac2b4aefa94eac
│  │  ├─ 5e
│  │  │  └─ 0cc2ac4c180c16272ef983f8da6558062a8dec
│  │  ├─ 5f
│  │  │  ├─ 45f115ace4c6cc2490be6b82954fb0c8c10eef
│  │  │  └─ 66a361d108ac17197292d16c75667209ef49d0
│  │  ├─ 61
│  │  │  ├─ 244c838788643ed0dcd8b91a04876e5c6bbffa
│  │  │  └─ 9a057bab46acf8097b606fca0ebf6e89caa5dd
│  │  ├─ 62
│  │  │  └─ 50ba77a6b84c590bf4b2f2e5193bc8f2e7cb81
│  │  ├─ 64
│  │  │  └─ 376951383dcb86456f4227ca6250075078fab3
│  │  ├─ 66
│  │  │  ├─ 0fa65b73483746d5ed85fabb40d39da13f0e2a
│  │  │  └─ b9cf3e8ecc2a2d2b4888b7b53b2a21dd7dfad7
│  │  ├─ 68
│  │  │  ├─ 3f04a289aa844c845db0b3920747301ac61416
│  │  │  └─ 5a0d3644ee51bda33bca8c005fb4fc427a823a
│  │  ├─ 69
│  │  │  ├─ 184fe69713960b46ba194ac260d6a07439a02c
│  │  │  ├─ a1ee686821d2a99f3a24a1a302dc07c800d7c0
│  │  │  └─ f938b8562185d5b84cc9ac39bee216405755ea
│  │  ├─ 6a
│  │  │  └─ c6aebbedd5a4431bed55f92bd775aa93c0bbf4
│  │  ├─ 6c
│  │  │  └─ 7c04e4d39784ffa34689cb592ebf2d182e8617
│  │  ├─ 6f
│  │  │  └─ ab00552123a4486d188b99b1a81001ebf55cbf
│  │  ├─ 70
│  │  │  └─ eae05f753f21e5a3c6cc602058616f6d5c516f
│  │  ├─ 71
│  │  │  └─ 866b409141e27e73febdbfa7da67b2c968a3fc
│  │  ├─ 73
│  │  │  └─ 9a447de985c270eee2e16045498c15d38406e2
│  │  ├─ 74
│  │  │  ├─ 036a3db7b7d5520026ae85953f82264f89045b
│  │  │  ├─ 395225f5d0df8be52738323fcaf2dd1b6cf06d
│  │  │  └─ 8654bec9b5064322cd76625e148d021458598b
│  │  ├─ 75
│  │  │  └─ 1697aa93dfd16e8f945327ae4bcccc5e767aa2
│  │  ├─ 76
│  │  │  └─ 8bf4f708c625957746303734764f81e1e09607
│  │  ├─ 77
│  │  │  ├─ 120e5f824f73cc1863644ccd5e45eb05766d40
│  │  │  └─ 2a59b172ae1b0109dbd2d853baa54b8c8259f8
│  │  ├─ 78
│  │  │  └─ af3ecf68711d8d637ce394acd415023087ede8
│  │  ├─ 79
│  │  │  ├─ 0fa30581da02482a827d096eb6621265710942
│  │  │  ├─ 461c3139a2533188141bef1a84f4361ce5ed92
│  │  │  └─ da8762f97d98f4084bfb879d02b0bf28bc28be
│  │  ├─ 7a
│  │  │  ├─ b2eddc5a9b5baccafb991da7b522119aedb500
│  │  │  └─ eb17b32cc7d3cc44a324c301d8497ce76073b4
│  │  ├─ 7c
│  │  │  └─ d96f761d8b2cf43fb4e4ae9dd516bc12569ee9
│  │  ├─ 7d
│  │  │  ├─ 75e07ef214ea657c93200068ebc96cbf92caf1
│  │  │  └─ e5fe8eb920278cfb863f38f4600c2bf6f3e54f
│  │  ├─ 7f
│  │  │  └─ 4cd342b2882760b5cfaa5ce16161f5b92271b0
│  │  ├─ 80
│  │  │  └─ 3141f323d60a446189240e0b5aab02b7aa3152
│  │  ├─ 82
│  │  │  └─ cfb74a8509b3cd3680b826ee0ed9e02f4876c5
│  │  ├─ 83
│  │  │  └─ fea909b08efb0c002f8f9a639eeac55a558d28
│  │  ├─ 85
│  │  │  └─ a2de3b05ffc854b903ec876a44c11ae6ba9c40
│  │  ├─ 86
│  │  │  └─ 95eb1ca4e888e652a419a38d225632b8e46ce3
│  │  ├─ 87
│  │  │  └─ 1f7d8bcb8662143b0b9f384853ed21e96b3570
│  │  ├─ 8a
│  │  │  ├─ 6b0658b0eba16925854eb4fdcd747223307c03
│  │  │  └─ e7bcb3843d1b7724cfbdc411ac867bce129b1a
│  │  ├─ 8c
│  │  │  ├─ 6e7dac18ab336e7d8da94a8f233172e53f0769
│  │  │  ├─ 956fff8085bda8a3c01f4047bdde35f09485f9
│  │  │  └─ df45ae4b8d45d414643b38da17dc2cad0ce1e7
│  │  ├─ 8d
│  │  │  ├─ 5b95a9396a08d71cbfe44cd3da7af79e0603e9
│  │  │  ├─ d4b5661acb3e94b0a96c56036356078ae0c119
│  │  │  └─ ecca517fc4ba32660d00aa103583bb49eca104
│  │  ├─ 8e
│  │  │  ├─ 9a6b316b7a83f6668885b8c4cb35f41bf44444
│  │  │  └─ dceb913ec684c0da90b54e4be2ae98e6ff4b1b
│  │  ├─ 90
│  │  │  └─ fcfd155c354bec7b3cd20792d1bca1e47ddfba
│  │  ├─ 95
│  │  │  ├─ 3ff65a290444e6b43301357c87900cc5c58789
│  │  │  ├─ 99f60ec3af083e9bb001274af09afe2678f6cc
│  │  │  ├─ b3a690cbbaacdf0392abf408aa51fcd55a20a0
│  │  │  └─ c79b3e2cd394c7bca5faaca4bb4fa155e3b5f9
│  │  ├─ 99
│  │  │  └─ 31644001b507dda9c2e13728353e29971e98a5
│  │  ├─ 9f
│  │  │  ├─ 4a6a8d40bd269909a6ff4730e0fdf5692296d9
│  │  │  └─ 9dfed3aceb04f96593a72cde6999736abf4c72
│  │  ├─ a0
│  │  │  └─ 5ba819d138f74f21861e4c906a06def2674b7e
│  │  ├─ a1
│  │  │  ├─ 08caf0d28407792c3cc819ade9ffdefde599ee
│  │  │  └─ 5c0e445dda21094588477ceac65958a063ffa7
│  │  ├─ a2
│  │  │  └─ 40a3240252dae4398c54441da24e02cd281db6
│  │  ├─ a3
│  │  │  └─ 82aab886a83c3dc58e209750e54db7cfd22959
│  │  ├─ a5
│  │  │  └─ 8c85005ff18ff71a41f44f21c0b233aad1be57
│  │  ├─ a6
│  │  │  └─ ccc406d19d71834f63f2b681608868b458d8ba
│  │  ├─ a7
│  │  │  └─ 72525135f40b8ae50480c5fd686b56a519fe6e
│  │  ├─ a8
│  │  │  └─ b0e3b18468c6e8e125bfaff9bc21489d8c3403
│  │  ├─ ab
│  │  │  ├─ 13a18679a3665206f8a67e0534a3f7eeaf4d83
│  │  │  ├─ 6cf684c821269ca03b3ef70a6f832f98ffa986
│  │  │  └─ a752a85ccc08d460e1fc3768054401ed541bfa
│  │  ├─ ad
│  │  │  └─ 0d442d2d1b7ea1805e19c6a9ad000ec317e389
│  │  ├─ ae
│  │  │  └─ b4a0d5e7aeac4757d995f9d1ce3c6a56660ef2
│  │  ├─ af
│  │  │  └─ 7eedfd6076a1c3d80808a5a0cb198bd356c776
│  │  ├─ b0
│  │  │  └─ 36939152440f4b53cf4cf06522700ea7db16d1
│  │  ├─ b1
│  │  │  └─ 6e37f901242a8dce149bcbe16147b6f13fd7f6
│  │  ├─ b2
│  │  │  └─ 9d935b05e7beb9bd6542f333220e1b76b1592f
│  │  ├─ b3
│  │  │  └─ 94872fbd805e2958c82dba951bbb69279025e2
│  │  ├─ b4
│  │  │  ├─ 0489b5871f2eed7a5116ddeaacdab59b83a7f8
│  │  │  └─ 7f4ab3ff61e370fe731bc24839dd25afe6fc64
│  │  ├─ b5
│  │  │  ├─ 100e98046bbd44ea0c451511c5d8604307bd2d
│  │  │  └─ 7172928a218dd1273c8d54b39e3fd9540d5b2a
│  │  ├─ b6
│  │  │  └─ f3a8c50615a6e3031f48dae67a21c50c84002a
│  │  ├─ b7
│  │  │  └─ 894b50fa9bdce4c51a70104769b7abd006f43e
│  │  ├─ b8
│  │  │  └─ 5ec226d02391f4d09f3d9d0e9b2a05ca869458
│  │  ├─ ba
│  │  │  └─ 9ecc7b47fafd31ee8570600b8fa7ceffff98c7
│  │  ├─ bd
│  │  │  └─ 2d7db2f274ccb57ac72eeb7022c89ff4fe7bf1
│  │  ├─ be
│  │  │  └─ c0f164ac623008535b0321e3299aefdee3b383
│  │  ├─ c0
│  │  │  ├─ 166e972d897db8c6847749f9b57a9f5b3594e4
│  │  │  ├─ 6196545570aa52471b72dcbf8e4f62e6762604
│  │  │  ├─ b5cef476764b192d12c4226f57081f3a4f0fed
│  │  │  └─ c3bb352a50e16ac5159420276f8da2ba278925
│  │  ├─ c1
│  │  │  └─ 1abf68bbf37bd38f25d25ac0fc1ea31e0efdd0
│  │  ├─ c2
│  │  │  ├─ 2005ecf600487426ac149028546de1d7e606d2
│  │  │  └─ f2d2f1b65d570b402d427aaa5511ca0df7a2fd
│  │  ├─ c3
│  │  │  ├─ d8e047262af19762d3d994766d8a80823fcb37
│  │  │  └─ f4a67388bac0f23fe02a3c58a8cf015dc2e88a
│  │  ├─ c4
│  │  │  ├─ 880f6f5e947975193f8df641f13cf273f8e3bd
│  │  │  └─ e72aea2b8609890fdd8b36cdae93ebd5e22514
│  │  ├─ c5
│  │  │  └─ 2f1ad8b07c4ca39e8bff8bbf0157570613cdde
│  │  ├─ c6
│  │  │  ├─ 5ca660aa6c958656316057daddbae698a93d3f
│  │  │  ├─ 817c6b4030077dc9adf581aa10c92882b1adee
│  │  │  └─ b0e00e6d60cc9614e640784aa8ffe1f3ae7f9f
│  │  ├─ c7
│  │  │  └─ 34b69589e0014bbe0d7eab1f8278bc775a6dc5
│  │  ├─ ca
│  │  │  └─ 50df86b9a5305b1354d6320a572a67e3116c9e
│  │  ├─ cb
│  │  │  └─ 22fe6326da0212712fa49981fa75d6458de5e4
│  │  ├─ cc
│  │  │  ├─ 8e8684fd89024499506e9b1230dced74c00f3c
│  │  │  ├─ 9731529d8050bbb309faa9facb622fdfc31dee
│  │  │  └─ d11723e06cb9dd50b55dbcb2b72ee545b294aa
│  │  ├─ cd
│  │  │  └─ 08909833898d6cb7b0ae344acde16258501a2a
│  │  ├─ ce
│  │  │  ├─ 1f8017160af982f01986768cdec5f5464ec753
│  │  │  ├─ 40ac163dcbb559e120ef53219a00cc57d88aa6
│  │  │  └─ 4b3aa6ea920febbc693b559e9ecbb2867fd4d8
│  │  ├─ cf
│  │  │  └─ f3af12a9159a720f77bc477d3aeaa0660fbc59
│  │  ├─ d1
│  │  │  ├─ 485a07bd590a2a3c327cbd7f808a10f8418710
│  │  │  └─ 9f885da311344a2d730a51c67b28d468fbb4cb
│  │  ├─ d2
│  │  │  ├─ 98f7d4244c4a14c81ad4cf1e72812c098fba43
│  │  │  └─ a5c9ba12b9f1c8bd4fdcf1108154e43766b295
│  │  ├─ d3
│  │  │  └─ 31acc7b2ed6ebc1ac2782aa9af81eb7bcb6ff1
│  │  ├─ d4
│  │  │  └─ 22c14c2d6c77f155c1eb6b8daba30f5d92b4b6
│  │  ├─ d5
│  │  │  └─ a8066e302179e292e5a6883d74b7bb80de3ff7
│  │  ├─ d6
│  │  │  └─ 3fb091d95e8e5fb73a75dd336250e29ad2579f
│  │  ├─ d8
│  │  │  └─ 3db6a9cfbc5ee21527f14782698e7842280839
│  │  ├─ d9
│  │  │  └─ 933b19d41a672bc349708ed359016fabe3c3b7
│  │  ├─ da
│  │  │  ├─ a0e5e023047b1e1fd17a4c406bdba93760f9dc
│  │  │  └─ a92d66cc23fc0bfbdf68e5e9cb6213c0c09a87
│  │  ├─ dc
│  │  │  ├─ b9f3d5dcbf9c816ddd7a2a1e1778ceaa3d8d12
│  │  │  └─ f86c159b98c329cbf0701038361736e0a24b5b
│  │  ├─ dd
│  │  │  ├─ 965bfe9380c54e960b80a686ca4962858365c0
│  │  │  └─ 9e0033fc4e9091a2e556318499e2ebd1ce1d6c
│  │  ├─ de
│  │  │  ├─ 23a964a2ae136ac8d9f18d4150bc73943cc64f
│  │  │  └─ 51913a1fe308cb824ba74999eb8f512affe631
│  │  ├─ e1
│  │  │  └─ 25bc547934c9cd08db4355ca3cbafa848a1981
│  │  ├─ e2
│  │  │  ├─ 76fbfc87c6b859dd668d53945be3118fd8ceb5
│  │  │  └─ 9befd48d75bc4f80351ee88f5230d55a759dca
│  │  ├─ e3
│  │  │  └─ d82f9faaada601b25c949beec564d0dae9d57d
│  │  ├─ e4
│  │  │  ├─ 0c33bae15f8f2ddd28fd800c982dfaa5d02d74
│  │  │  └─ f0644c2c2c8cbd937a261bb88a211b678169dd
│  │  ├─ e5
│  │  │  └─ 3e5187ceab7164590e96013fdd369f84e4e70e
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ e7
│  │  │  ├─ d09b0af155199aa1043bce2b2b66698dd6f1ac
│  │  │  └─ fb48e7542d328e44c0a7fa509ddc1736e04068
│  │  ├─ e8
│  │  │  ├─ 149c5adbbd27eb3712407eb230a75fceb5a920
│  │  │  └─ 4231a45c52f3f5934dda264606ecc943846122
│  │  ├─ e9
│  │  │  ├─ 5a46e59f21be72a716266eb274bb3bdbfe0e10
│  │  │  └─ abd2741d6e24732e6f745ca0ce3dc6f1fba070
│  │  ├─ eb
│  │  │  └─ e0c261f0914d737e1483d8690c0f13f72538b3
│  │  ├─ ec
│  │  │  ├─ 69d9ec2fa2a67a65df962344f4c0b04bdc08c3
│  │  │  └─ 97c464fc2e68025bc4b2876b290ed7ac9d5212
│  │  ├─ ed
│  │  │  ├─ 854cdb8305cb0ed11eaccd6b565f4f5032ea6c
│  │  │  └─ 8ff22ee06690e3f639641b56cea5255f79c7cb
│  │  ├─ ee
│  │  │  ├─ 2c38c629e626cac8a11c9672f57ec4a3a5fc09
│  │  │  └─ 550c790838131ba952dce38da31edcde152858
│  │  ├─ ef
│  │  │  └─ 2ddc08210e869aa25e4581db1897d98e783854
│  │  ├─ f3
│  │  │  ├─ 483bea796d2f2be2e4fc160b85d7d3068b909a
│  │  │  └─ ffbc4e2f16025dc5b6bb7042bf2270a78f6530
│  │  ├─ f4
│  │  │  ├─ 10a7d0b7f65592a70a74766a2b5fbbb2d1b1e5
│  │  │  ├─ 2941b7e83ecb5de49d00487f1142220d28d2f8
│  │  │  └─ df2cca62bbb66a0ef27eae6b6fccfb0af55080
│  │  ├─ f6
│  │  │  └─ 3fab3c7f7d00ecf494050fa021e182b893b259
│  │  ├─ f7
│  │  │  └─ 55a6c8e8310e6e361d640523eb39453617db26
│  │  ├─ f8
│  │  │  ├─ 26bf257611ab7c24822587b3e68751e18bef3c
│  │  │  └─ 6cefc394b461c40fd3fe7b8dbf2fb0198fc812
│  │  ├─ fd
│  │  │  └─ 57e9ce030e19faaf2fda18c01fa3ee0a736fc9
│  │  ├─ ff
│  │  │  └─ 8ea615994e711f8f24335d7476c33e6ebad983
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  ├─ main
│     │  └─ production
│     ├─ remotes
│     │  └─ origin
│     │     ├─ main
│     │     └─ production
│     ├─ stash
│     └─ tags
├─ .gitignore
├─ .npmignore
├─ README.md
├─ package-lock.json
├─ package.json
├─ src
│  ├─ .DS_Store
│  ├─ PythonScripts
│  │  ├─ arrangeFiles.py
│  │  ├─ build.py
│  │  ├─ checkDevices.py
│  │  └─ upload.py
│  ├─ app.py
│  ├─ blocks
│  │  └─ clang_blocks.js
│  ├─ cFiles
│  │  ├─ config.c
│  │  ├─ cycfg_notices.h
│  │  ├─ cycfg_notices_template.h
│  │  ├─ cycfg_pins.c
│  │  ├─ cycfg_pins.h
│  │  └─ main.c
│  ├─ devicesInfo
│  │  ├─ devicesInfo.json
│  │  ├─ portsInfo.txt
│  │  ├─ supportedDevices.txt
│  │  └─ test.txt
│  ├─ generators
│  │  └─ clang.js
│  ├─ index.css
│  ├─ index.html
│  ├─ index.js
│  ├─ log.txt
│  ├─ program.mk
│  ├─ serialization.js
│  ├─ test.mjs
│  ├─ toolbox.js
│  ├─ toolbox_xmc_14.js
│  └─ toolbox_xmc_47.js
└─ webpack.config.js

```