
/**
 * convert CSS angle-values to "deg" angle
 * @param  value the CSS angle value (incl. unit) to convert to "deg"
 * @return the (converted) "deg" angle
 */
export function toDeg(value: string): number;

/**
 * convert CSS angle-values to "grad" angle
 * @param  value the CSS angle value (incl. unit) to convert to "grad"
 * @return the (converted) "grad" angle
 */
export function toGrad(value: string): number;

/**
 * convert CSS angle-values to "turn" angle
 * @param  value the CSS angle value (incl. unit) to convert to "turn"
 * @return the (converted) "turn" angle
 */
export function toTurn(value: string): number;

/**
 * convert CSS angle-values to "turn" angle
 * @param  value the CSS angle value (incl. unit) to convert to "turn"
 * @return the (converted) "turn" angle
 */
export function toTurn(value: string): number;

export function parseValue(value: string): ParsedValue;

export interface ParsedValue {
  prefix: string;
  value: string;
  unit: string;
}
