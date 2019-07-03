import { ERC20 } from "./ERC20";
import { BigNumber } from 'bignumber.js';
import { IntentAction } from "../IntentAction";

export class WETH extends ERC20 {
    deposit(value: number | string | BigNumber ): IntentAction {
        return this.functionEncoder("deposit").encode([], new BigNumber(value))
    }
}