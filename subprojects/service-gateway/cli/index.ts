import program from 'commander'
import { default as config } from '@config/index'
import { createConnection } from 'typeorm'

program
  .arguments('<seedFile> path pattern to seed files')
  .option('-c, --config <config>', 'specify ormconfig path')
  .action(async (seedFile, options) => {
    try {
      const conn = await createConnection(config.database.e2e)
      switch (seedFile) {
        case 'user':
          break
        case 'detail':
          break
        case 'info':
          break
      }
      console.log("completed");
      process.exit(0);
    } catch (err) {
      console.log("failed");
      console.error(err);
      process.exit(1);
    }
  });

program.parse(process.argv);
