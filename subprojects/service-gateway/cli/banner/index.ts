import chalk from 'chalk'
import figlet from 'figlet'


figlet.text(process.argv[2], {
    font:'4Max',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, (error: any, data: any) => {
    if (error) {
        return process.exit(1)
    }
    console.log(chalk.red(data))
    return process.exit(0)
});
