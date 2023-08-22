import React = require('react');

/**
 * =========================================================
 * ====================== GESTALT PACKAGE DEPENDENCIES =====================
 * =========================================================
 */

/**
 * =========================================================
 * ====================== SHARED UTILS =====================
 * =========================================================
 */

type Node = React.ReactNode;

type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (
  arg: U & {
    readonly event: T;
  },
) => void;

type ReactForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * =========================================================
 * ====================== SHARED TYPED =====================
 * =========================================================
 */

/**
 * =========================================================
 * =============== COMPONENT API INTERFACES  ===============
 * =========================================================
 */

export interface ChartProps {
  id: string;
}

/**
 * =========================================================
 * ========================= INDEX =========================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/daterange
 */
export const Chart: React.FunctionComponent<ChartProps>;
