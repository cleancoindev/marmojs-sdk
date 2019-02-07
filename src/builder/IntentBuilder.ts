import { Intent, IntentDependency } from '../model/Intent';
import { IntentAction } from 'src';
import BigNumber = require("bn.js");
import { SignedIntent } from 'src/model/SignedIntent';

export class IntentBuilder {
    dependencies: Array<SignedIntent | IntentDependency> = [];
    salt: string = "0x";
    expiration: BigNumber;
    action: IntentAction;
    maxGasLimit: BigNumber = new BigNumber(2).pow(new BigNumber(256)).sub(new BigNumber(1));
    maxGasPrice: BigNumber = new BigNumber(2).pow(new BigNumber(256)).sub(new BigNumber(1));

    withDependencies(value: Array<SignedIntent | IntentDependency>): IntentBuilder {
        this.dependencies = value;
        return this;
    }

    withSalt(value: string): IntentBuilder {
        this.salt = value;
        return this;
    }

    withExpiration(value: string | number | BigNumber): IntentBuilder {
        this.expiration = new BigNumber(value);
        return this;
    }

    withIntentAction(value: IntentAction) {
        this.action = value;
        return this;
    }

    withMaxGasLimit(value: string | number | BigNumber): IntentBuilder {
        this.maxGasLimit = new BigNumber(value);
        return this;
    }

    withMaxGasPrice(value: string | number | BigNumber): IntentBuilder {
        this.maxGasPrice = new BigNumber(value);
        return this;
    }

    build(): Intent {
        if (this.expiration === undefined) {
            this.expiration = new BigNumber(Math.floor(new Date().getTime() + 86400 * 365));
        }

        return new Intent(
            this.dependencies,
            this.action,
            this.salt,
            this.maxGasPrice,
            this.maxGasLimit,
            this.expiration
        );
    }
}
