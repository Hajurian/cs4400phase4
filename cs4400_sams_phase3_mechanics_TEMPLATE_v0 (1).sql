-- CS4400: Introduction to Database Systems: Monday, March 3, 2025
-- Simple Airline Management System Course Project Mechanics [TEMPLATE] (v0)
-- Views, Functions & Stored Procedures

/* This is a standard preamble for most of our scripts.  The intent is to establish
a consistent environment for the database behavior. */
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'flight_tracking';
use flight_tracking;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [_] supporting functions, views and stored procedures
-- -----------------------------------------------------------------------------
/* Helpful library capabilities to simplify the implementation of the required
views and procedures. */
-- -----------------------------------------------------------------------------
drop function if exists leg_time;
delimiter //
create function leg_time (ip_distance integer, ip_speed integer)
	returns time reads sql data
begin
	declare total_time decimal(10,2);
    declare hours, minutes integer default 0;
    set total_time = ip_distance / ip_speed;
    set hours = truncate(total_time, 0);
    set minutes = truncate((total_time - hours) * 60, 0);
    return maketime(hours, minutes, 0);
end //
delimiter ;

-- [1] add_airplane()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new airplane.  A new airplane must be sponsored
by an existing airline, and must have a unique tail number for that airline.
username.  An airplane must also have a non-zero seat capacity and speed. An airplane
might also have other factors depending on it's type, like the model and the engine.  
Finally, an airplane must have a new and database-wide unique location
since it will be used to carry passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_airplane;
delimiter //
create procedure add_airplane (in ip_airlineID varchar(50), in ip_tail_num varchar(50),
	in ip_seat_capacity integer, in ip_speed integer, in ip_locationID varchar(50),
    in ip_plane_type varchar(100), in ip_maintenanced boolean, in ip_model varchar(50),
    in ip_neo boolean)
sp_main: begin

	-- Ensure that the plane type is valid: Boeing, Airbus, or neither
    -- Ensure that the type-specific attributes are accurate for the type
    -- Ensure that the airplane and location values are new and unique
    -- Add airplane and location into respective tables
    
   if ip_airlineID not in (select airlineID from airplane) then 
   select "airline doesn't exist";
   leave sp_main;
   end if;
   
   if ip_tail_num in (select tail_num from airplane where airlineID = ip_airlineID) then
   select 'tail num is not unique';
   leave sp_main;
   end if;
   
   if ip_seat_capacity <= 0 or ip_speed <= 0 then
   select 'seat capacity and or speed must be a positive value';
   leave sp_main;
   end if;
   
   if ip_locationID in (select locationID from location) then
   select 'locationID is not unique';
   end if;
   insert into location(locationID) values (ip_locationID);
   
   if ip_plane_type like 'Boeing' then 
	   if ip_maintenanced is NULL then
	   select 'maintenance cannot be null on Boeing';
       leave sp_main;
	   end if;
   elseif ip_plane_type like 'Airbus' then
	   if ip_neo is NULL then
	   select 'maintenance cannot be null on Airbus';
       leave sp_main;
	   end if;
	elseif ip_plane_type is not NULL then 
	select 'airplane type is NOT neither';
    leave sp_main;
    end if;

   
   
   
   insert into airplane(airlineID, tail_num, seat_capacity, speed, locationID, plane_type, maintenanced, model, neo)
   values (ip_airlineID, ip_tail_num, ip_seat_capacity, ip_speed, ip_locationID, ip_plane_type, ip_maintenanced, ip_model, ip_neo);
   

end //
delimiter ;

-- [2] add_airport()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new airport.  A new airport must have a unique
identifier along with a new and database-wide unique location if it will be used
to support airplane takeoffs and landings.  An airport may have a longer, more
descriptive name.  An airport must also have a city, state, and country designation. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_airport;
delimiter //
create procedure add_airport (in ip_airportID char(3), in ip_airport_name varchar(200),
    in ip_city varchar(100), in ip_state varchar(100), in ip_country char(3), in ip_locationID varchar(50))
sp_main: begin

	-- Ensure that the airport and location values are new and unique
    -- Add airport and location into respective tables
    
    if ip_airportID in (select airportID from airport) then
    select 'airport ID already exists';
    leave sp_main;
    else
		if ip_locationID in (select locationID from location) then
			select  'locationID already exists';
			leave sp_main;
        else
			insert into location(locationID) value (ip_locationID);
            insert into airport(airportID, airport_name, city, state, country, locationID) 
            values(ip_airportID, ip_airport_name, ip_city, ip_state, ip_country, ip_locationID);
		end if;
	end if;

end //
delimiter ;

# The second one is done

-- [3] add_person()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new person.  A new person must reference a unique
identifier along with a database-wide unique location used to determine where the
person is currently located: either at an airport, or on an airplane, at any given
time.  A person must have a first name, and might also have a last name.

A person can hold a pilot role or a passenger role (exclusively).  As a pilot,
a person must have a tax identifier to receive pay, and an experience level.  As a
passenger, a person will have some amount of frequent flyer miles, along with a
certain amount of funds needed to purchase tickets for flights. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_person;
delimiter //
create procedure add_person (in ip_personID varchar(50), in ip_first_name varchar(100),
    in ip_last_name varchar(100), in ip_locationID varchar(50), in ip_taxID varchar(50),
    in ip_experience integer, in ip_miles integer, in ip_funds integer)
sp_main: begin

	-- Ensure that the location is valid
    -- Ensure that the persion ID is unique
    -- Ensure that the person is a pilot or passenger
    -- Add them to the person table as well as the table of their respective role
    
    if ip_locationID not in (select locationID from location) then
    select 'location is not unique';
    leave sp_main;
    end if;
    
    if ip_personID in (select personID from person) then
    select 'personID must be unique';
    leave sp_main;
    end if;
    
    if ip_first_name is null then
    select 'first name cannot be empty';
    leave sp_main;
    end if;
    
    insert into person(personID, first_name, last_name, locationID)
    values (ip_personID, ip_first_name, ip_last_name, ip_locationID);
    
    if ip_experience > 0 then
		insert into pilot(personID, taxID, experience)
        values(ip_personID, ip_taxID, ip_experience);
	else
		insert into passenger(personID, miles, funds)
        values(ip_personID, ip_miles, ip_funds);
	end if;
    
end //
delimiter ;


-- [4] grant_or_revoke_pilot_license()
-- -----------------------------------------------------------------------------
/* This stored procedure inverts the status of a pilot license.  If the license
doesn't exist, it must be created; and, if it aready exists, then it must be removed. */
-- -----------------------------------------------------------------------------
drop procedure if exists grant_or_revoke_pilot_license;
delimiter //
create procedure grant_or_revoke_pilot_license (in ip_personID varchar(50), in ip_license varchar(100))
sp_main: begin
	declare license_exists integer;
	-- Ensure that the person is a valid pilot
    -- If license exists, delete it, otherwise add the license
    if ip_personID not in (select personID from pilot) then
    select 'pilot must exist to revoke his/her license';
    leave sp_main;
    end if;
    
    select count(*) into license_exists from pilot_licenses
    where personID = ip_personID and license = ip_license;
    
    if license_exists > 0 then
		delete from pilot_licenses where personID = ip_personID and license = ip_license;
	else
		insert into pilot_licenses(personID, license) values (ip_personID, ip_license);
	end if;
    

end //
delimiter ;
-- [5] offer_flight()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new flight.  The flight can be defined before
an airplane has been assigned for support, but it must have a valid route.  And
the airplane, if designated, must not be in use by another flight.  The flight
can be started at any valid location along the route except for the final stop,
and it will begin on the ground.  You must also include when the flight will
takeoff along with its cost. */
-- -----------------------------------------------------------------------------
drop procedure if exists offer_flight;
delimiter //
create procedure offer_flight (in ip_flightID varchar(50), in ip_routeID varchar(50),
    in ip_support_airline varchar(50), in ip_support_tail varchar(50), in ip_progress integer,
    in ip_next_time time, in ip_cost integer)
sp_main: begin
	declare progress_rp integer;
    select ip_progress into progress_rp;

	-- Ensure that the airplane exists
    -- Ensure that the route exists
    -- Ensure that the progress is less than the length of the route
    -- Create the flight with the airplane starting in on the ground
    if ip_support_airline is not null then 
		if ip_support_airline not in (select airlineID from airplane) and ip_support_tail not in (select tail_num from airplane) then
		select "this airplane doesn't exist";
        leave sp_main;
		end if;
        if ip_support_airline in (select support_airline from flight) and ip_support_tail in (select support_tail from flight) then
        select 'this airplane is already in a flight';
        leave sp_main;
        end if;
	end if;
    
    if ip_routeID not in (select routeID from route) then
    select 'this route is invalid';
    leave sp_main;
    end if;
    
    if progress_rp >= (select max(sequence) from route_path where routeID = ip_routeID) then
    select 'progress needs to be less than length of route';
    leave sp_main;
    end if;
    
    insert into flight(flightID, routeID, support_airline, support_tail, progress, airplane_status, next_time, cost)
    values (ip_flightID, ip_routeID, ip_support_airline, ip_support_tail, ip_progress,'on_ground', ip_next_time, ip_cost);
    
end //
delimiter ;

-- [6] flight_landing()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for a flight landing at the next airport
along it's route.  The time for the flight should be moved one hour into the future
to allow for the flight to be checked, refueled, restocked, etc. for the next leg
of travel.  Also, the pilots of the flight should receive increased experience, and
the passengers should have their frequent flyer miles updated. */
-- -----------------------------------------------------------------------------
drop procedure if exists flight_landing;
delimiter //
create procedure flight_landing (in ip_flightID varchar(50))
sp_main: begin

	declare total_miles int;
	-- Ensure that the flight exists
	if ip_flightID not in (select flightID from flight) then
    select 'this flight does not exist';
    leave sp_main;
    end if;
	-- Ensure that the flight is in the air
    if (select airplane_status from flight where ip_flightID = flightID) = 'on_ground' then
    select 'flight needs to be in air';
    leave sp_main;
    end if;
    
	-- Increment the pilot's experience by 1
    update pilot
    set experience = experience + 1
    where commanding_flight = (select flightID from flight where flightID = ip_flightID);
 
	-- aggregate total miles variable
    select sum((select distance from leg where legID in (select legID from route_path where routeID = 
    (select routeID from flight where flightID = ip_flightID) and sequence = 
    (select progress from flight where flightID = ip_flightID)))) into total_miles;
    -- Increment the frequent flyer miles of all passengers on the plane
    update passenger pass join person pers on pass.personID = pers.personID
	set pass.miles = pass.miles + total_miles
	where locationID in (select locationID from airplane where airlineID = 
    (select support_airline from flight where flightID = ip_flightID) 
    and tail_num = (select support_tail from flight where flightID = ip_flightID));
    
    update flight
    set airplane_status = 'on_ground' where flightID = ip_flightID;
        -- Update the status of the flight and increment the next time to 1 hour later
		-- Hint: use addtime()
    update flight
    set next_time = addtime(next_time, '1:00:00') where flightID = ip_flightID;

end //
delimiter ;

-- [7] flight_takeoff()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for a flight taking off from its current
airport towards the next airport along it's route.  The time for the next leg of
the flight must be calculated based on the distance and the speed of the airplane.
And we must also ensure that Airbus and general planes have at least one pilot
assigned, while Boeing must have a minimum of two pilots. If the flight cannot take
off because of a pilot shortage, then the flight must be delayed for 30 minutes. */
-- -----------------------------------------------------------------------------
drop procedure if exists flight_takeoff;
delimiter //
create procedure flight_takeoff (in ip_flightID varchar(50))
sp_main: begin
	
	declare v_next_progress int;
    
	-- Ensure that the flight exists
	if ip_flightID not in (select flightID from flight) then
		select 'this flight does not exist';
		leave sp_main;
		end if;
		
	-- Ensure that the flight is on the ground
	if (select airplane_status from flight where ip_flightID = flightID) = 'in_flight' then
		select 'flight needs to be on ground';
		leave sp_main;
		end if;
		
	-- Ensure that the flight has another leg to fly
if (select progress from flight where flightID = ip_flightID) >= 
    (select max(sequence) from route_path where routeID = (select routeID from flight where flightID = ip_flightID)) then
    select 'flight has no more legs to be flown';
    leave sp_main;
    end if;

	-- Ensure that there are enough pilots (1 for Airbus and general, 2 for Boeing)
	-- If there are not enough, move next time to 30 minutes later

	-- Check if its Boeing
	if (select plane_type from airplane where airlineID = (select support_airline from flight where flightID = ip_flightID)
		and tail_num = (select support_tail from flight where flightID = ip_flightID)) = 'Boeing' then
			if (select count(*) from pilot where commanding_flight = ip_flightID) < 2 then 
				update flight
				set next_time = addtime(next_time, '00:30:00')
				where flightID = ip_flightID;
				leave sp_main;
			end if;
			
	-- If not Boeing then its Airbus        
	else 
		if (select count(*) from pilot where commanding_flight = ip_flightID) < 1 then 
			update flight
			set next_time = addtime(next_time, '00:30:00')
			where flightID = ip_flightID;
			leave sp_main;
		end if;
	end if;
			
		-- Increment the progress and set the status to in flight
		-- Calculate the flight time using the speed of airplane and distance of leg
		-- Update the next time using the flight time
    
    set v_next_progress = (select progress from flight where flightID = ip_flightID);
    set v_next_progress = v_next_progress + 1;
    
	update flight
	join route_path rl on flight.routeID = rl.routeID
	join leg l on rl.legID = l.legID
	join airplane a on flight.support_airline = a.airlineID and flight.support_tail = a.tail_num
	set flight.progress = flight.progress + 1,
	flight.airplane_status = 'in_flight',
        flight.next_time = addtime(
		flight.next_time,
		SEC_TO_TIME(l.distance * 3600 / a.speed))
	where flight.flightID = ip_flightID and rl.sequence = v_next_progress;

end //
delimiter ;

-- [8] passengers_board()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for passengers getting on a flight at
its current airport.  The passengers must be at the same airport as the flight,
and the flight must be heading towards that passenger's desired destination.
Also, each passenger must have enough funds to cover the flight.  Finally, there
must be enough seats to accommodate all boarding passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists passengers_board; 
delimiter //
create procedure passengers_board (in ip_flightID varchar(50))
sp_main: begin
	declare num_passengers int;
	-- Ensure the flight exists
    if ip_flightID not in (select flightID from flight) then
    select 'the flight does not exist';
    leave sp_main;
    end if;
    -- Ensure that the flight is on the ground
	if (select airplane_status from flight where flightID = ip_flightID) != 'on_ground' then
    select 'flight is not on the ground';
    leave sp_main;
    end if;
    -- Ensure that the flight has further legs to be flown
	if (select progress from flight where flightID = ip_flightID) >= 
    (select max(sequence) from route_path where routeID = (select routeID from flight where flightID = ip_flightID)) then
    select 'flight has no more legs to be flown';
    leave sp_main;
    end if;
    -- Determine the number of passengers attempting to board the flight
    -- Use the following to check:
		-- The airport the airplane is currently located at
        -- The passengers are located at that airport
        -- The passenger's immediate next destination matches that of the flight
	select count(*) from (select pass.personID from passenger pass join person pers on pass.personID = pers.personID where locationID =  
	(select locationID from airport where airportID = 
	(select departure from leg where legID = 
	(select legID from route_path where routeID = 
	(select routeID from flight where flightID = ip_flightID) limit 1)
	))) as passenger_count into num_passengers;
	-- The passenger has enough funds to afford the flight
    	-- Check if there enough seats for all the passengers
		-- If not, do not add board any passengers
        -- If there are, board them and deduct their funds
	 if num_passengers > (select seat_capacity from airplane where airlineID = (select airlineID from flight where flightID = ip_flightID)
		and tail_num = (select support_tail from flight where flightID = ip_flightID)) then
		select 'There are too many passengers attempting to board';
        leave sp_main;
	 else -- TODO
		
		update passenger
		set funds = funds - (select cost from flight where flightID = ip_flightID)
		where personID IN (select personID FROM (select pass.personID from passenger pass join person pers ON pass.personID = pers.personID 
        where pers.locationID = (select locationID from airport where airportID = 
			(select departure from leg where legID = (select MIN(legID) from route_path where routeID = 
            (select routeID from flight where flightID = ip_flightID)))) 
        and funds > (select cost from flight where flightID = ip_flightID)
    ) as subquery_alias
    );
		
	update person 
	set locationID = (select locationID  from airplane  where airlineID = 
    (select support_airline from flight where flightID = ip_flightID) and tail_num = 
    (select support_tail from flight where flightID = ip_flightID))
	where personID IN (select personID from (select pers.personID from passenger pass join person pers on pass.personID = pers.personID 
		where pers.locationID = (select locationID from airport where airportID = 
			(select departure from leg where legID = (select MIN(legID) from route_path where routeID = 
            (select routeID from flight where flightID = ip_flightID))))) as person_alias);
		end if;
			


end //
delimiter ;

-- [9] passengers_disembark()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for passengers getting off of a flight
at its current airport.  The passengers must be on that flight, and the flight must
be located at the destination airport as referenced by the ticket. */
-- -----------------------------------------------------------------------------
drop procedure if exists passengers_disembark;
delimiter //
create procedure passengers_disembark (in ip_flightID varchar(50))
sp_main: begin

    declare v_current_airport char(3);
	
	-- Ensure the flight exists
    if ip_flightID not in (select flightID from flight) then
		select 'flight does not exist';
		leave sp_main;
	end if;
    -- Ensure that the flight is grounded
    if (select airplane_status from flight where flightID = ip_flightID) = 'in_flight' then
		select 'flight must be grounded';
        leave sp_main;
	end if;
    
    -- Determine the list of passengers who are disembarking
	-- Use the following to check:
		-- Passengers must be on the plane supporting the flight
        -- Passenger has reached their immediate next destionation airport
    
    select arrival into v_current_airport from leg
    join route_path on leg.legID = route_path.legID
    where route_path.routeID = (select routeID from flight where flightID = ip_flightID)
    and route_path.sequence = (select progress from flight where flightID = ip_flightID); -- Get Current Airport
    
    update person p
    join passenger_vacations pv on p.personID = pv.personID
    set p.locationID = (select locationID from airport where airportID = v_current_airport)
    where pv.airportID = v_current_airport
    and pv.personID in (
        select personID from passenger
        where locationID = (select locationID from airplane where airlineID = (select support_airline from flight where flightID = ip_flightID) 
        and tail_num = (select support_tail from flight where flightID = ip_flightID))
    ); -- update locationID based on current airport and if passanger is on the flight
    

    -- Update the vacation plans of the passengers
    delete from passenger_vacations 
    where personID in (select personID from person where locationID = (select locationID from airport where airportID = v_current_airport))
				   and airportID = v_current_airport
                   and sequence = (select progress from flight where flightID = ip_flightID); -- Delete the entry where these condition are met
                   
	update passenger_vacations set sequence = sequence - 1
		where personID in (select personID from person where locationID = (select locationID from airport where airportID = v_current_airport)) 
			and sequence > (select progress from flight where flightID = ip_flightID); -- Decrement sequence if current seqeuence is greater than current progress
end //
delimiter ;

-- [10] assign_pilot()
-- -----------------------------------------------------------------------------
/* This stored procedure assigns a pilot as part of the flight crew for a given
flight.  The pilot being assigned must have a license for that type of airplane,
and must be at the same location as the flight.  Also, a pilot can only support
one flight (i.e. one airplane) at a time.  The pilot must be assigned to the flight
and have their location updated for the appropriate airplane. */
-- -----------------------------------------------------------------------------
drop procedure if exists assign_pilot;
delimiter //
create procedure assign_pilot (in ip_flightID varchar(50), ip_personID varchar(50))
sp_main: begin

	-- Ensure the flight exists
	if ip_flightID not in (select flightID from flight) then
    select 'the flight does not exist';
    leave sp_main;
    end if;
    -- Ensure that the flight is on the ground
	if (select airplane_status from flight where flightID = ip_flightID) != 'on_ground' then
    select 'flight is not on the ground';
    leave sp_main;
    end if;
    -- Ensure that the flight has further legs to be flown
	if (select progress from flight where flightID = ip_flightID) >= 
    (select max(sequence) from route_path where routeID = (select routeID from flight where flightID = ip_flightID)) then
    select 'flight has no more legs to be flown';
    leave sp_main;
    end if;
    -- Ensure that the pilot exists and is not already assigned
    if ip_personID not in (select personID from pilot) then 
    select 'pilot does not exist';
    leave sp_main;
    end if;
    if (select commanding_flight from pilot where ip_personID = personID) is not null then
    select 'pilot is supporting another flight';
    leave sp_main;
    end if;
	-- Ensure that the pilot has the appropriate license
    
    if (select plane_type from airplane where airlineID = (select support_airline from flight where flightID = ip_flightID)
    and tail_num = (select support_tail from flight where flightID = ip_flightID)) not in 
    (select license from pilot_licenses where personID = ip_personID) then
		if (select plane_type from airplane where airlineID = (select support_airline from flight where flightID = ip_flightID)
		and tail_num = (select support_tail from flight where flightID = ip_flightID) and plane_type = null) not in 
		(select license from pilot_licenses where personID = ip_personID and license like 'general')
		then
		select 'pilot does not have appropriate licenses';
        leave sp_main;
		end if;
    end if;
    -- Ensure the pilot is located at the airport of the plane that is supporting the flight
    
    -- Assign the pilot to the flight and update their location to be on the plane
	update pilot
    set commanding_flight = ip_flightID
    where personID = ip_personID;
    
    update person
    set locationID = (select locationID from airplane where airlineID = 
    (select support_airline from flight where flightID = ip_flightID) and tail_num = 
    (select support_tail from flight where flightID = ip_flightID))
    where personID = ip_personID;
end //
delimiter ;
-- [11] recycle_crew()
-- -----------------------------------------------------------------------------
/* This stored procedure releases the assignments for a given flight crew.  The
flight must have ended, and all passengers must have disembarked. */
-- -----------------------------------------------------------------------------
drop procedure if exists recycle_crew;
delimiter //
create procedure recycle_crew (in ip_flightID varchar(50))
sp_main: begin

-- Ensure that the flight is on the ground
    if (select airplane_status from flight where flightID = ip_flightID) != 'on_ground' then
        select 'flight is not on ground';
        leave sp_main;
    end if;

    -- Ensure there are no more legs (assuming progress not incrementing means no more legs)
    if (select progress from flight where flightID = ip_flightID) <
       (select COUNT(*) from route_path where routeID = (select routeID from flight where flightID = ip_flightID)) then
        select 'flight still has more legs';
        leave sp_main;
    end if;

    -- Ensure the flight is empty of passengers
    if exists (
        select * from person where locationID = (
            select a.locationID from airplane a
            join flight f on a.airlineID = f.support_airline and a.tail_num = f.support_tail
            where f.flightID = ip_flightID
        )
        and personID in (select personID from passenger)
        ) 
        then select 'passengers still on the plane';
        leave sp_main;
    end if;

    -- Move pilots to the airport where the plane is parked
	update person p
	set p.locationID = (
		select loc.locationID
		from leg l
		join route_path rp on l.legID = rp.legID
		join airport a on l.arrival = a.airportID 
		join location loc on a.locationID = loc.locationID 
		where rp.routeID = (select f.routeID from flight f where f.flightID = ip_flightID)
		order by rp.sequence desc
		limit 1
	)
	where p.personID in (select pl.personID from pilot pl where pl.commanding_flight = ip_flightID);

	-- Clear commanding_flight for pilots
	update pilot set commanding_flight = null where commanding_flight = ip_flightID;

end //
delimiter ;

-- [12] retire_flight()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a flight that has ended from the system.  The
flight must be on the ground, and either be at the start its route, or at the
end of its route.  And the flight must be empty - no pilots or passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists retire_flight;
delimiter //
create procedure retire_flight (in ip_flightID varchar(50))
sp_main: begin

    -- Ensure that the flight is on the ground
	if (select airplane_status from flight where flightID = ip_flightID) != 'on_ground' then
    select 'flight is not on the ground';
    leave sp_main;
    end if;
    -- Ensure that the flight has further legs to be flown
	if (select progress from flight where flightID = ip_flightID) != 
    (select max(sequence) from route_path where routeID = (select routeID from flight where flightID = ip_flightID))
    and (select progress from flight where flightID = ip_flightID) > 0 then
    select 'flight still has legs to be flown';
    leave sp_main;
    end if;
    
    -- Ensure that there are no more people on the plane supporting the flight
    if (select count(locationID) from person p where p.locationID = 
    (select locationID from airplane where airlineID = (select support_airline from flight where flightID = ip_flightID)
    and tail_num = (select support_tail from flight where flightID = ip_flightID))
    ) > 0 then
    select 'flight still supporting passengers';
    leave sp_main;
    end if;
    -- Remove the flight from the system
	delete from flight where flightID = ip_flightID;
end //
delimiter ;
-- [13] simulation_cycle()
-- -----------------------------------------------------------------------------
/* This stored procedure executes the next step in the simulation cycle.  The flight
with the smallest next time in chronological order must be identified and selected.
If multiple flights have the same time, then flights that are landing should be
preferred over flights that are taking off.  Similarly, flights with the lowest
identifier in alphabetical order should also be preferred.

If an airplane is in flight and waiting to land, then the flight should be allowed
to land, passengers allowed to disembark, and the time advanced by one hour until
the next takeoff to allow for preparations.

If an airplane is on the ground and waiting to takeoff, then the passengers should
be allowed to board, and the time should be advanced to represent when the airplane
will land at its next location based on the leg distance and airplane speed.

If an airplane is on the ground and has reached the end of its route, then the
flight crew should be recycled to allow rest, and the flight itself should be
retired from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists simulation_cycle;
delimiter //
create procedure simulation_cycle ()
sp_main: begin

	-- Identify the next flight to be processed
    declare selected_flightID varchar(50);
    select flightID from flight order by next_time asc, (airplane_status = 'on_ground'), flightID asc limit 1 into selected_flightID;
    -- If the flight is in the air:
    if (select airplane_status from flight where flightID = selected_flightID) = 'in_flight' then
		-- Land the flight and disembark passengers
		call flight_landing(selected_flightID);
        call passengers_disembark(selected_flightID);
        if ((select progress from flight where flightID = selected_flightID) = 
        (select max(sequence) from route_path where routeID = (select routeID from flight where flightID = selected_flightID))) 
        then
        -- If it has reached the end:
			-- Recycle crew and retire flight
            call recycle_crew(selected_flightID);
            call retire_flight(selected_flightID);
        end if;
        else
			call passengers_board(selected_flightID);
            call flight_takeoff(selected_flightID);
    end if;


            
	-- If the flight is on the ground:
		-- Board passengers and have the plane takeoff
        
	-- Hint: use the previously created procedures

end //
delimiter ;

-- [14] flights_in_the_air()
-- -----------------------------------------------------------------------------
/* This view describes where flights that are currently airborne are located. 
We need to display what airports these flights are departing from, what airports 
they are arriving at, the number of flights that are flying between the 
departure and arrival airport, the list of those flights (ordered by their 
flight IDs), the earliest and latest arrival times for the destinations and the 
list of planes (by their respective flight IDs) flying these flights. */
-- -----------------------------------------------------------------------------
create or replace view flights_in_the_air (departing_from, arriving_at, num_flights,
	flight_list, earliest_arrival, latest_arrival, airplane_list) as
select 
	l.departure as departing_from,
    l.arrival as arriving_at,
    count(distinct f.flightID) as num_flights,
    group_concat(distinct f.flightID order by f.flightID asc) as flight_list,
    MIN(f.next_time) AS earliest_arrival,
	MAX(f.next_time) AS latest_arrival,
    GROUP_CONCAT(DISTINCT a.locationID ORDER BY a.locationID desc) AS airplane_list
    from flight f
	join route_path r ON f.routeID = r.routeID and f.progress = r.sequence
	join leg l ON r.legID = l.legID
	join airplane a ON f.support_airline = a.airlineID and f.support_tail = a.tail_num
    where
    f.airplane_status = 'in_flight'
    group by l.departure, l.arrival;

-- [15] flights_on_the_ground()
-- ------------------------------------------------------------------------------
/* This view describes where flights that are currently on the ground are 
located. We need to display what airports these flights are departing from, how 
many flights are departing from each airport, the list of flights departing from 
each airport (ordered by their flight IDs), the earliest and latest arrival time 
amongst all of these flights at each airport, and the list of planes (by their 
respective flight IDs) that are departing from each airport.*/
-- ------------------------------------------------------------------------------
create or replace view flights_on_the_ground (departing_from, num_flights,
	flight_list, earliest_arrival, latest_arrival, airplane_list) as 
select 
    case 
        when f.progress = 0 then air2.airportid
        else air1.airportid
    end as departing_from,
    count(distinct f.flightid) as num_flights,
    group_concat(distinct f.flightid order by f.flightid asc) as flight_list,
    min(f.next_time) as earliest_arrival,
    max(f.next_time) as latest_arrival,
    group_concat(distinct a.locationid order by a.locationid desc) as airplane_list
from flight f
join airplane a on f.support_airline = a.airlineid and f.support_tail = a.tail_num
join route_path rp on f.routeid = rp.routeid
join leg l on rp.legid = l.legid
left join airport air1 on l.arrival = air1.airportid
left join airport air2 on l.departure = air2.airportid
where f.airplane_status = 'on_ground'
and (
    rp.sequence = f.progress or 
    (f.progress = 0 and rp.sequence = 1)
)
group by departing_from;

-- [16] people_in_the_air()
-- -----------------------------------------------------------------------------
/* This view describes where people who are currently airborne are located. We 
need to display what airports these people are departing from, what airports 
they are arriving at, the list of planes (by the location id) flying these 
people, the list of flights these people are on (by flight ID), the earliest 
and latest arrival times of these people, the number of these people that are 
pilots, the number of these people that are passengers, the total number of 
people on the airplane, and the list of these people by their person id. */
-- -----------------------------------------------------------------------------
create or replace view people_in_the_air (departing_from, arriving_at, num_airplanes,
	airplane_list, flight_list, earliest_arrival, latest_arrival, num_pilots,
	num_passengers, joint_pilots_passengers, person_list) as
select 
    l.departure as departing_from,
    l.arrival as arriving_at,
    count(distinct a.locationID) as num_airplanes,
    group_concat(distinct a.locationID order by a.locationID) as airplane_list,
    group_concat(distinct f.flightid order by f.flightid) as flight_list,
    min(f.next_time) as earliest_arrival,
    max(f.next_time) as latest_arrival,
    count(pi.personid) as num_pilots,
    count(pas.personid) as num_passengers,
    count(distinct pe.personid) as joint_pilots_passengers,
    group_concat(distinct pe.personid order by pe.personid) as person_list
from flight f
join airplane a on f.support_airline = a.airlineid and f.support_tail = a.tail_num
join route_path rp on f.routeid = rp.routeid
join leg l on rp.legid = l.legid and rp.sequence = f.progress
left join person pe on pe.locationid = a.locationid
left join pilot pi on pi.personid = pe.personid and pi.commanding_flight = f.flightid
left join passenger pas on pas.personid = pe.personid
where f.airplane_status = 'in_flight'
group by l.departure, l.arrival;

-- [17] people_on_the_ground()
-- -----------------------------------------------------------------------------
/* This view describes where people who are currently on the ground and in an 
airport are located. We need to display what airports these people are departing 
from by airport id, location id, and airport name, the city and state of these 
airports, the number of these people that are pilots, the number of these people 
that are passengers, the total number people at the airport, and the list of 
these people by their person id. */
-- -----------------------------------------------------------------------------
create or replace view people_on_the_ground (departing_from, airport, airport_name,
	city, state, country, num_pilots, num_passengers, joint_pilots_passengers, person_list) as
select
	a.airportID as departing_from,
	a.locationID as airport, 
	a.airport_name,
	a.city,
	a.state,
    a.country,
    count((select personID from pilot p where pers.personID = p.personID)) as num_pilots,
    count((select personID from passenger p where pers.personID = p.personID)) as num_passengers,
    count(pers.personID) as joint_pilots_passengers,
    group_concat(distinct pers.personID order by pers.personId asc) as person_list

from person pers
join airport a on pers.locationID = a.locationID
group by departing_from, airport, a.airport_name, a.city, a.state, a.country
;

-- [18] route_summary()
-- -----------------------------------------------------------------------------
/* This view will give a summary of every route. This will include the routeID, 
the number of legs per route, the legs of the route in sequence, the total 
distance of the route, the number of flights on this route, the flightIDs of 
those flights by flight ID, and the sequence of airports visited by the route. */
-- -----------------------------------------------------------------------------
create or replace view route_summary (route, num_legs, leg_sequence, route_length,
	num_flights, flight_list, airport_sequence) as
select rp.routeID as route,
    count(distinct rp.legID) as num_legs,
    group_concat(distinct l.legID order by rp.sequence asc) as leg_sequence,
    (select sum(distance) from leg where legID in (select distinct legID from route_path where routeid = rp.routeid)) as route_length,
    count(distinct f.flightID) as num_flights,
    group_concat(distinct f.flightid order by f.flightid) as flight_list,
    group_concat(distinct concat(l.departure, '->', l.arrival) order by rp.sequence) as airport_sequence
    from route_path as rp
    join leg l on rp.legID = l.legID
    left join flight f on rp.routeID = f.routeID
    group by route
;

-- [19] alternative_airports() DONE
-- -----------------------------------------------------------------------------
/* This view displays airports that share the same city and state. It should 
specify the city, state, the number of airports shared, and the lists of the 
airport codes and airport names that are shared both by airport ID. */
-- -----------------------------------------------------------------------------
create or replace view alternative_airports (city, state, country, num_airports,
	airport_code_list, airport_name_list) as
select a.city, a.state, a.country, count(*) as num_airports,
group_concat(a.airportID order by a.airportID) as airport_code_list,
group_concat(a.airport_name order by a.airportID) as airport_name_list
from airport a group by a.city, a.state, a.country having num_airports > 1;
