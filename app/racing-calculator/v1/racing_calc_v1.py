# Dynamic Racing Calculator
# By FormulaTroy

## DEFINE EXTRA MATH FUNCTIONS (fuel, wear, deg)
#laps, fuel_needed = fuel(race_type, race_unit, avg_lap, avg_fuel)
#1 min / 2 laps

def fuel(race_type, race_unit, avg_lap, avg_fuel, fuel_tank_max):
    if race_type == 1:
        laps = (((race_unit * 60) / avg_lap) + 1)
        fuel_needed = ((laps * avg_fuel) + 1)
    else:
        laps = race_unit
        fuel_needed = ((laps * avg_fuel) + 1)
    if fuel_needed > fuel_tank_max:
        fuel_stop = 1
        fuel_stop_count = fuel_needed / fuel_tank_max
    else:
        fuel_stop = 2
    return laps, fuel_needed, fuel_stop, fuel_stop_count

def tire_wear_calc(laps, tire_wear):
    final_wear = tire_wear * laps
    if final_wear > 70:
        tire_wear_stop = 1
        tire_wear_stop_count = final_wear / 70
    elif final_wear <= 69:
        tire_wear_stop = 0
    return tire_wear_stop, final_wear, tire_wear_stop_count

def tire_deg_calc(laps, tire_deg):
    final_deg = tire_deg * laps
    if final_deg > 8:
        tire_deg_stop = 1
        tire_deg_stop_count = final_deg / 8
    elif final_deg <= 7.9:
        tire_deg_stop = 0
    return tire_deg_stop, final_deg, tire_deg_stop_count

## end definintions ---------


## MAINLINE
def main():

    #initialize variables
    fuel_stop, tire_wear_stop, tire_deg_stop, tire_wear, tire_deg = 0,0,0,0,0
    calculator_menu, avg_lap, avg_fuel, fuel_tank_max, race_type = 0,0,0,0,0
    fuel_stop_count, tire_wear_stop_count, tire_deg_stop_count = 0,0,0

    # welcome and menu system
    print("")
    print("Which calculator would you like to use?")
    print("Note: All options will calculate the lap count and fuel strategy.")
    print("1 - Fuel Only")
    print("2 - Fuel + Tire Wear")
    print("3 - Fuel + Tire Degredation")
    print("4 - Fuel + Tire Wear + Tire Degredation")
    print("")
    calculator_menu = eval(input("Which calculator do you want to use? (1-4): "))
    print("")

    # classification inputs
    car_class = input("Car Class (LMP2, GT3, etc.): ")
    car_model = input("Car Model (Accord, ARX-01, etc.): ")
    track = input("Track (Monza, Putnam Park, etc.): ")
    print("")

    # data inputs
    avg_lap = eval(input("What is the average race lap time? (In seconds; e.g. 93.428): "))
    avg_fuel = eval(input("What is the average fuel usage per racing lap? (In liters): "))
    fuel_tank_max = eval(input("What is the fuel tank size? (In liters): "))
    print("")

    # race type
    print("1 - Timed Race")
    print("2 - Lapped Race")
    race_type = eval(input("Is this a timed or lapped race? (1 or 2): "))
    if race_type == 1:
        race_unit = eval(input("How many minutes is the race?: "))
    else:
        race_unit = eval(input("How many laps is the race?: "))
    print("")

    #1 - fuel
    if calculator_menu == 1:
        laps, fuel_needed, fuel_stop, fuel_stop_count = fuel(race_type, race_unit, avg_lap, avg_fuel, fuel_tank_max)

    #2 - fuel + tire wear
    elif calculator_menu == 2:
        tire_wear = eval(input("What is the average tire wear per lap? (In percent; e.g. 1.5): "))
        laps, fuel_needed, fuel_stop, fuel_stop_count = fuel(race_type, race_unit, avg_lap, avg_fuel, fuel_tank_max)
        tire_wear_stop, final_wear, tire_wear_stop_count = tire_wear_calc(laps, tire_wear)

    #3 - fuel + tire deg
    elif calculator_menu == 3:
        tire_deg = eval(input("What is the average tire degredation per lap? (In deg value; e.g. 0.217): "))
        laps, fuel_needed, fuel_stop, fuel_stop_count = fuel(race_type, race_unit, avg_lap, avg_fuel, fuel_tank_max)
        tire_deg_stop, final_deg, tire_deg_stop_count = tire_deg_calc(laps, tire_deg)

    #4 - fuel + tire wear + tire deg
    elif calculator_menu == 4:
        tire_wear = eval(input("What is the average tire wear per lap? (In percent; e.g. 1.5): "))
        tire_deg = eval(input("What is the average tire degredation per lap? (In deg value; e.g. 0.217): "))
        laps, fuel_needed, fuel_stop, fuel_stop_count = fuel(race_type, race_unit, avg_lap, avg_fuel, fuel_tank_max)
        tire_wear_stop, final_wear, tire_wear_stop_count = tire_wear_calc(laps, tire_wear)
        tire_deg_stop, final_deg, tire_deg_stop_count = tire_deg_calc(laps, tire_deg)


    ##print all inputs / outputs
    print("")
    print("")
    print("           RACING CALCULATOR REPORT")
    print("")

    #find menu and type
    if calculator_menu == 1:
        print("You picked the fuel calculator.")
    elif calculator_menu == 2:
        print("You picked the fuel and tire wear calculator.")
    elif calculator_menu == 3:
        print("You picked the fuel and tire degredation calculator.")
    elif calculator_menu == 4:
        print("You picked the fuel, tire wear, and tire degredation calculator.")
    print("")

    if race_type == 1:
        race_type_text = "time"
        race_type_text_2 = "minutes"
    else:
        race_type_text = "lap"
        race_type_text_2 = "laps"

    #class and track info
    print("For the", car_class, car_model, "around the", track, "circuit we have the following results for this", race_type_text+"-based race.")
    print("")
    print("Race length: ", race_unit, race_type_text_2)
    if race_type == 1:
        print("Projected lap count: ", (((race_unit * 60) / avg_lap) + 1), "laps.")
    print("")

    #fuel for all
    print("Full fuel tank size: ", str(fuel_tank_max)+"L")
    print("Fuel per lap: ", str(avg_fuel)+"L")
    print("Fuel needed: ", str(fuel_needed)+"L")
    
    if fuel_stop == 1:
        print("You WILL need to stop for fuel during the race.")
        print("Projected fuel stops: ", str(fuel_stop_count)[0:1], "stops")
    else:
        print("You will NOT a stop for fuel.")
    print("")

    #tire wear loops for 2 and 4
    if calculator_menu == 2:
        print("Tire wear per lap: ", str(tire_wear)+"% of wear.")
        print("Total tire wear: ", str(final_wear)+"% of wear.")
        if tire_wear_stop == 1:
            print("You WILL need to stop for tires due to wear.")
            print("Projected tire wear stops: ", str(tire_wear_stop_count)[0:1], "stops")
            print("")
        else:
            print("You will NOT need a stop for wear.")
            print("")

    if calculator_menu == 4:
        print("Tire wear per lap: ", str(tire_wear)+"% of wear.")
        print("Total tire wear: ", str(final_wear)+"% of wear.")
        if tire_wear_stop == 1:
            print("You WILL need to stop for tires due to wear.")
            print("Projected tire wear stops: ", str(tire_wear_stop_count)[0:1], "stops")
            print("")
        else:
            print("You will NOT need a stop for wear.")
            print("")

    #tire deg loops for 3 and 4
    if calculator_menu == 3:
        print("Tire degredation per lap: ", tire_deg, "units of deg.")
        print("Total tire degredation: ", str(final_deg), "units of deg.")
        if tire_deg_stop == 1:
            print("You WILL need to stop for tires due to degredation.")
            print("Projected tire wear stops: ", str(tire_deg_stop_count)[0:1], "stops")
            print("")
        else:
            print("You will NOT need a stop for degredation.")
            print("")

    if calculator_menu == 4:
        print("Tire degredation per lap: ", tire_deg, "units of deg.")
        print("Total tire degredation: ", str(final_deg), "units of deg.")
        if tire_deg_stop == 1:
            print("You WILL need to stop for tires due to degredation.")
            print("Projected tire wear stops: ", str(tire_deg_stop_count)[0:1], "stops")
            print("")
        else:
            print("You will NOT need a stop for degredation.")
            print("")

main()
